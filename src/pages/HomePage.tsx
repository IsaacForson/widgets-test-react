/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import Button from "../components/Button";

// Dummy API service - will be replaced with real Claude integration
/* eslint-disable @typescript-eslint/no-unused-vars */
const ChatbotService = {
  async evaluateIntent(_description: string) {
    // Simulating API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // For MVP, always return that more info is needed
    return {
      isEnough: false,
      questions: [
        "What is the primary purpose of this chatbot? (e.g., customer support, lead generation, FAQ)",
        "Who is your target audience?",
        "What tone should the chatbot use? (e.g., professional, casual, friendly)",
      ],
    };
  },

  async publishChatbot(_description: string, _answers: string) {
    // Simulating publishing
    await new Promise((resolve) => setTimeout(resolve, 2000));

    return {
      chatLink: "https://chat.example.com/your-bot-id",
      phoneNumber: "+1 (555) 123-4567",
    };
  },
};
/* eslint-enable @typescript-eslint/no-unused-vars */

type WizardStep = "slide1" | "slide2" | "publishing" | "complete";

const HomePage: React.FC = () => {
  const [step, setStep] = useState<WizardStep>("slide1");
  const [userDescription, setUserDescription] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [questions, setQuestions] = useState<string[]>([]);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [chatbotDetails, setChatbotDetails] = useState<{
    chatLink: string;
    phoneNumber: string;
  } | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [recognition, setRecognition] = useState<any>(null);

  // Voice input handler (using Web Speech API)
  const handleVoiceInput = () => {
    // If already listening, stop
    if (isListening && recognition) {
      recognition.stop();
      return;
    }
    if (
      !("webkitSpeechRecognition" in window) &&
      !("SpeechRecognition" in window)
    ) {
      alert(
        "Voice input is not supported in your browser. Please use Chrome or Edge."
      );
      return;
    }

    const SpeechRecognition =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition;
    const recognitionInstance = new SpeechRecognition();
    setRecognition(recognitionInstance);

    recognitionInstance.continuous = true; // Keep listening
    recognitionInstance.interimResults = true; // Show results as you speak
    recognitionInstance.lang = "en-US";

    let finalTranscript = userDescription; // Keep track of final text

    recognitionInstance.onstart = () => {
      setIsListening(true);
    };

    recognitionInstance.onresult = (event: any) => {
      let interimTranscript = "";

      // Loop through all results
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript;

        if (event.results[i].isFinal) {
          // Add final result with a space
          finalTranscript += (finalTranscript ? " " : "") + transcript;
        } else {
          // Show interim result
          interimTranscript += transcript;
        }
      }

      // Update the textarea with both final and interim results
      setUserDescription(
        finalTranscript + (interimTranscript ? " " + interimTranscript : "")
      );
    };

    recognitionInstance.onerror = (event: any) => {
      setIsListening(false);
      // Update with final transcript before stopping
      setUserDescription(finalTranscript);
      setRecognition(null);

      // Provide specific error messages based on error type
      let errorMessage = "Voice input error. Please try again.";

      if (event.error === "no-speech") {
        errorMessage = "No speech detected. Please try speaking again.";
      } else if (event.error === "audio-capture") {
        errorMessage =
          "Microphone not found or not working. Please check your microphone.";
      } else if (event.error === "not-allowed") {
        errorMessage =
          "Microphone permission denied. Please allow microphone access in your browser settings.";
      } else if (event.error === "network") {
        errorMessage = "Network error. Please check your internet connection.";
      } else if (event.error === "aborted") {
        // Don't show error if user manually stopped
        return;
      }

      alert(errorMessage);
    };

    recognitionInstance.onend = () => {
      setIsListening(false);
      // Ensure final transcript is saved
      setUserDescription(finalTranscript);
      setRecognition(null);
    };

    recognitionInstance.start();
  };

  // Handle Slide 1 submission
  const handleSlide1Submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const result = await ChatbotService.evaluateIntent(userDescription);

      if (result.isEnough) {
        // Skip to publishing
        setStep("publishing");
        await publishChatbot();
      } else {
        // Show follow-up questions
        setQuestions(result.questions);
        setStep("slide2");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Handle Slide 2 submission
  const handleSlide2Submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStep("publishing");
    await publishChatbot();
  };

  // Publish chatbot
  const publishChatbot = async () => {
    try {
      // Combine all answers into a single string
      const combinedAnswers = Object.values(answers).join(" | ");
      const result = await ChatbotService.publishChatbot(
        userDescription,
        combinedAnswers
      );
      setChatbotDetails(result);
      setStep("complete");
    } catch (error) {
      console.error("Error:", error);
      alert("Publishing failed. Please try again.");
      setStep(questions.length > 0 ? "slide2" : "slide1");
    }
  };

  // Reset wizard
  const handleReset = () => {
    setStep("slide1");
    setUserDescription("");
    setQuestions([]);
    setAnswers({});
    setChatbotDetails(null);
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-base-200 p-4 md:p-8">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-base-content mb-2">
            🤖 Chatbot Builder
          </h1>
          <p className="text-base-content/70">
            Create your AI chatbot in just 2 simple steps
          </p>
        </div>

        {/* Slide 1: Initial Intent Capture */}
        {step === "slide1" && (
          <div className="card bg-base-100">
            <div className="card-body">
              <h2 className="card-title text-2xl mb-4 text-black text-base">
                Tell me about the agent you want
              </h2>
              <p className="text-base-content/70 ">
                Describe your chatbot idea in your own words. The more details
                you provide, the better!
              </p>

              <form onSubmit={handleSlide1Submit} className="space-y-3">
                <div className="form-control">
                  <textarea
                    className="placeholder:text-gray-400 textarea border border-gray-200 h-40 text-base focus:outline-none focus:ring-0 w-full text-black text-sm resize-none !rounded-lg"
                    placeholder="Example: I want a customer support chatbot for my e-commerce store that can help customers track orders, answer product questions, and handle returns..."
                    value={userDescription}
                    onChange={(e) => setUserDescription(e.target.value)}
                    required
                  />
                </div>

                <div className="flex items-center gap-4">
                  <Button
                    variant={isListening ? "danger" : "secondary"}
                    size="sm"
                    onClick={handleVoiceInput}
                    icon={
                      isListening ? (
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 10a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1v-4z"
                          />
                        </svg>
                      ) : (
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
                          />
                        </svg>
                      )
                    }
                  >
                    {isListening ? "Stop Listening" : "Click to Talk"}
                  </Button>

                  <div className="text-sm text-base-content/60">
                    {isListening
                      ? "Speak now - text appears as you talk"
                      : "or type your description above"}
                  </div>
                </div>

                <div className="card-actions justify-end mt-6">
                  <Button
                    type="submit"
                    variant="primary"
                    size="sm"
                    disabled={!userDescription.trim()}
                    loading={isLoading}
                    icon={
                      !isLoading && (
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      )
                    }
                  >
                    {isLoading ? "Analyzing..." : "Continue"}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Slide 2: Follow-up Questions */}
        {step === "slide2" && (
          <div className="card bg-base-100">
            <div className="card-body">
              <h2 className="card-title text-2xl mb-4 text-base text-black">
                Just a few more details...
              </h2>
              <p className="text-base-content/70 mb-6">
                Please answer the following questions to help us create the
                perfect chatbot for you:
              </p>

              <form onSubmit={handleSlide2Submit} className="space-y-6">
                {questions.map((question, index) => (
                  <div key={index} className="space-y-3">
                    <div className="flex items-start gap-3">
                      <svg
                        className="w-5 h-5 shrink-0 mt-1 text-primary"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      <div className="flex-1">
                        <label className="label">
                          <span className="label-text font-semibold text-black">
                            Question {index + 1}:
                          </span>
                        </label>
                        <p className="text-base-content mb-3">{question}</p>
                        <textarea
                          className="placeholder:text-gray-400 textarea border border-gray-200 h-20 text-base focus:outline-none focus:ring-0 w-full text-black text-sm resize-none !rounded-lg"
                          placeholder={`Your answer to question ${
                            index + 1
                          }...`}
                          value={answers[index] || ""}
                          onChange={(e) =>
                            setAnswers((prev) => ({
                              ...prev,
                              [index]: e.target.value,
                            }))
                          }
                          required
                        />
                      </div>
                    </div>
                  </div>
                ))}

                <div className="card-actions justify-between">
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => setStep("slide1")}
                    icon={
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 19l-7-7 7-7"
                        />
                      </svg>
                    }
                  >
                    Back
                  </Button>
                  <Button
                    type="submit"
                    variant="primary"
                    size="sm"
                    disabled={questions.some(
                      (_, index) => !answers[index]?.trim()
                    )}
                    icon={
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    }
                  >
                    Create Chatbot
                  </Button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Publishing State */}
        {step === "publishing" && (
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body items-center text-center py-12">
              <span className="loading loading-spinner loading-lg text-primary mb-4"></span>
              <h2 className="text-2xl font-bold mb-2">
                Publishing your chatbot...
              </h2>
              <p className="text-base-content/70">
                This will only take a moment. Please wait.
              </p>
            </div>
          </div>
        )}

        {/* Completion Screen */}
        {step === "complete" && chatbotDetails && (
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body items-center text-center">
              <div className="text-6xl mb-4">🎉</div>
              <h2 className="text-3xl font-bold mb-2">
                Your Chatbot is Ready!
              </h2>
              <p className="text-base-content/70 mb-8">
                Your chatbot has been successfully published. You can now start
                using it!
              </p>

              <div className="grid gap-4 w-full max-w-lg">
                {/* Chat Link */}
                <div className="alert alert-info">
                  <svg
                    className="w-6 h-6 shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                    />
                  </svg>
                  <div className="flex-1 text-left">
                    <div className="font-semibold mb-1">Chat Interface</div>
                    <a
                      href={chatbotDetails.chatLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="link link-primary break-all"
                    >
                      {chatbotDetails.chatLink}
                    </a>
                  </div>
                </div>

                {/* Phone Number */}
                <div className="alert alert-success">
                  <svg
                    className="w-6 h-6 shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                  <div className="flex-1 text-left">
                    <div className="font-semibold mb-1">Voice Access</div>
                    <div className="text-lg font-mono">
                      {chatbotDetails.phoneNumber}
                    </div>
                  </div>
                </div>
              </div>

              <div className="card-actions mt-8">
                <Button
                  variant="primary"
                  size="sm"
                  onClick={handleReset}
                  icon={
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 4v16m8-8H4"
                      />
                    </svg>
                  }
                >
                  Create Another Chatbot
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Step Indicator */}
        {(step === "slide1" || step === "slide2") && (
          <div className="text-center mt-6">
            <div className="text-sm text-base-content/60">
              Step {step === "slide1" ? "1" : "2"} of 2
            </div>
            <progress
              className="progress progress-primary w-64 mt-2"
              value={step === "slide1" ? 50 : 100}
              max="100"
            ></progress>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
