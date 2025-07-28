import { useEffect, useState } from "react";
import { useAuth } from '../hooks/useAuth.tsx';
import { getSuggestions } from '../api/get-suggestions';

const Suggestions = () => {
  const [message, setMessage] = useState<string>('');
  const { user, signedIn } = useAuth();
  const [suggestions, setSuggestions] = useState<string>('');

  useEffect(() => {
    setMessage('Welcome to the Menu! Here are our delicious offerings:');
    if (signedIn && user) {
      setMessage(`Hello ${user.first_name}, here is the AI suggestion box for you!`);
    } else if (!user || !signedIn) {
      setMessage('Please sign in to view the AI suggestions.');
    }
  }, [signedIn, user]);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const suggestionInput = (document.getElementById('suggestionInput') as HTMLTextAreaElement).value;
    console.log('Suggestion submitted:', suggestionInput);
    if (suggestionInput.trim() === '') {
      setSuggestions('Please enter a valid suggestion.');
      return;
    }
    getSuggestions(suggestionInput).then(response => {
      console.log('Suggestions response:', response);
      if (response.data.suggestion && response.data.suggestion.length > 0) {
        setSuggestions(response.data.suggestion);
      } else {
        setSuggestions('Failed to get your pizza suggestion. Please try again later.');
      }
    }).catch(error => {
      console.error('Error fetching suggestions:', error);
      setSuggestions('Failed to get your pizza suggestion. Please try again later.');
    });
  };

  return (
    <div className="container" style={{ marginTop: '10vh' }}>
      <div className="card-columns"></div>
      {user && signedIn &&
        <div className="card">
          <div className="card-body">
            <form>
              <div className="form-group">
                <textarea className="form-control" id="suggestionInput" rows={3} placeholder="Enter your food preference; We will suggest the best pizza for you..."></textarea>
              </div>
              <button type="submit" className="btn btn-primary mt-2" onClick={handleSubmit}>Ask from AI</button>
            </form>
          </div>
        </div>
      }
      {suggestions && suggestions.length > 0 && 
        <div className="alert alert-info" style={{ marginTop: '20px', fontSize: '1.2em', fontWeight: 'bold' }}>
          {suggestions}
        </div>
      }
      {message && message.length > 0 && 
        <div className="alert alert-info" style={{ marginTop: '20px', fontSize: '1.2em', fontWeight: 'bold' }}>
          {message}
        </div>
      }
    </div>
  );
};

export default Suggestions;