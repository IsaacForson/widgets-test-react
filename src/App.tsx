import { useState } from "react";
import "./App.css";
// Import widgets from halo-widgets
import {
  TextInput,
  PasswordInput,
  EmailInput,
  PhoneInput,
  DateInput,
  LocationInput,
  NumberInput,
  SliderInput,
  RadioInput,
  CheckboxInput,
  DropdownInput,
  TextareaInput,
} from "halo-widgets/react";

function App() {
  // State for different widgets
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");
  const [age, setAge] = useState(25);
  const [volume, setVolume] = useState(50);
  const [plan, setPlan] = useState("basic");
  const [interests, setInterests] = useState<string[]>([]);
  const [country, setCountry] = useState("us");
  const [description, setDescription] = useState("");

  return (
    <div className="app-container">
      <header>
        <h1>🎨 Halo Widgets Demo</h1>
        <p>Testing the halo-widgets npm package with React</p>
      </header>

      <main className="widgets-grid">
        {/* Text Input */}
        <section className="widget-section">
          <h2>Text Input</h2>
          <TextInput
            label="Username"
            placeholder="Enter your username"
            helperText="Choose a unique username (3-20 characters) - Type to see suggestions"
            value={username}
            onChange={(val) => setUsername(val)}
            required={true}
            minLength={3}
            maxLength={20}
            counter={true}
            clearable={true}
            allowSpaces={false}
            caseTransform="lowercase"
            // suggestionsSource="api"
            // suggestionsApi="https://api.datamuse.com/sug?s="
            minCharsForSuggestions={2}
            // debounceMs={300}
            onValidate={(isValid, error) =>
              console.log("Username valid:", isValid, error)
            }
          />
          <p className="output">Value: {username}</p>
        </section>

        {/* Password Input */}
        <section className="widget-section">
          <h2>Password Input</h2>
          <PasswordInput
            label="Password"
            placeholder="Enter a strong password"
            helperText="Must be at least 8 characters"
            value={password}
            onChange={(val) => setPassword(val)}
            required={true}
            minLength={8}
            showToggle={true}
            showStrength={true}
            showRequirements={true}
            showCopy={false}
            showGenerator={true}
            requireLowercase={true}
            requireUppercase={true}
            requireNumber={true}
            requireSymbol={true}
            onStrengthChange={(score, feedback) =>
              console.log("Strength:", score, feedback)
            }
          />
          <p className="output">Value: {password ? "••••••••" : ""}</p>
        </section>

        {/* Email Input */}
        <section className="widget-section">
          <h2>Email Input</h2>
          <EmailInput
            label="Email Address"
            placeholder="you@example.com"
            helperText="Enter your primary email"
            value={email}
            onChange={(val) => {
              if (typeof val === "string") {
                setEmail(val);
              }
            }}
            required={true}
            showDomainSuggestions={true}
            lowercase={true}
            trim={true}
          />
          <p className="output">Value: {email}</p>
        </section>

        {/* Phone Input */}
        <section className="widget-section">
          <h2>Phone Input</h2>
          <PhoneInput
            label="Phone Number"
            placeholder="Enter phone number"
            helperText="International phone number with country code"
            value={phone}
            onChange={(e164) => setPhone(e164)}
            required={true}
            allowCountrySelect={true}
            country="US"
            separateDialCode={true}
            autoDetectCountry={true}
            format="international"
          />
          <p className="output">Value: {phone}</p>
        </section>

        {/* Date Input */}
        <section className="widget-section">
          <h2>Date Input</h2>
          <DateInput
            label="Select Date"
            placeholder="Pick a date"
            helperText="Choose your preferred date"
            value={date}
            onChange={(val) => {
              if (typeof val === "string") {
                setDate(val);
              }
            }}
            required={true}
            mode="range"
            format="MM/DD/YYYY"
          />
          <p className="output">Value: {date}</p>
        </section>

        {/* Location Input */}
        <section className="widget-section">
          <h2>Location Input</h2>
          <LocationInput
            label="Location"
            placeholder="Search for a location"
            helperText="Note: Requires Google Maps API key to function"
            value={location}
            onChange={(val) => setLocation(val.label)}
            apiKey="AIzaSyBB3OLRQbqH7E_iPrRkkechxkHiuu_5_aQ"
            allowCoordinates={true}
          />
          <p className="output">Value: {location}</p>
        </section>

        {/* Number Input */}
        <section className="widget-section">
          <h2>Number Input</h2>
          <NumberInput
            label="Age"
            placeholder="Enter your age"
            helperText="You must be 18 or older"
            value={age}
            onChange={(val) => {
              if (val !== null) {
                setAge(val);
              }
            }}
            min={0}
            max={120}
            precision={0}
            required={true}
          />
          <p className="output">Value: {age}</p>
        </section>

        {/* Slider Input */}
        <section className="widget-section">
          <h2>Slider Input</h2>
          <SliderInput
            label="Volume"
            helperText="Adjust volume level"
            value={volume}
            onChange={(val) => setVolume(val as number)}
            min={0}
            max={100}
            step={1}
            suffix="%"
            showValueBubble={true}
          />
          <p className="output">Value: {volume}%</p>
        </section>

        {/* Radio Input */}
        <section className="widget-section">
          <h2>Radio Input</h2>
          <RadioInput
            label="Choose a Plan"
            helperText="Select your subscription tier"
            options={[
              { label: "Basic - $9/mo", value: "basic" },
              { label: "Pro - $29/mo", value: "pro" },
              { label: "Enterprise - $99/mo", value: "enterprise" },
            ]}
            value={plan}
            onChange={(val) => setPlan(val || "basic")}
            required={true}
          />
          <p className="output">Selected: {plan}</p>
        </section>

        {/* Checkbox Input */}
        <section className="widget-section">
          <h2>Checkbox Input</h2>
          <CheckboxInput
            label="Select Your Interests"
            helperText="Choose at least one"
            options={[
              { label: "AI & Machine Learning", value: "ai" },
              { label: "Web Development", value: "web" },
              { label: "Mobile Apps", value: "mobile" },
              { label: "Data Science", value: "data" },
              { label: "DevOps", value: "devops" },
            ]}
            value={interests}
            onChange={(vals) => setInterests(vals)}
            required={true}
            minSelected={1}
          />
          <p className="output">Selected: {interests.join(", ") || "None"}</p>
        </section>

        {/* Dropdown Input */}
        <section className="widget-section">
          <h2>Dropdown Input</h2>
          <DropdownInput
            label="Select Country"
            placeholder="Choose a country..."
            helperText="Select your country of residence"
            options={[
              { label: "United States", value: "us" },
              { label: "Canada", value: "ca" },
              { label: "United Kingdom", value: "uk" },
              { label: "Germany", value: "de" },
              { label: "France", value: "fr" },
              { label: "Japan", value: "jp" },
              { label: "Australia", value: "au" },
            ]}
            value={country}
            onChange={(val) => setCountry(val as string)}
            searchable={true}
            required={true}
          />
          <p className="output">Selected: {country}</p>
        </section>

        {/* Textarea Input */}
        <section className="widget-section full-width">
          <h2>Textarea Input</h2>
          <TextareaInput
            label="Description"
            placeholder="Tell us about your project..."
            helperText="Provide a detailed description (min 20 characters)"
            value={description}
            onChange={(val) => setDescription(val)}
            required={true}
            minLength={20}
            maxLength={500}
            rows={4}
            autoGrow={true}
            counter={true}
            clearable={true}
          />
          <p className="output">
            Value: {description.substring(0, 100)}
            {description.length > 100 ? "..." : ""}
          </p>
        </section>
      </main>

      <footer>
        <p>
          Built with Halo Widgets - A feature-rich widgets library for React
        </p>
      </footer>
    </div>
  );
}

export default App;
