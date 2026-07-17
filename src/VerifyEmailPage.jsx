import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { api, ApiError } from './api';

function VerifyEmailPage() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const [status, setStatus] = useState('verifying'); // verifying | success | error
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!token) {
      setStatus('error');
      setError('No verification token found in the link.');
      return;
    }

    api.verifyEmail(token)
      .then(() => setStatus('success'))
      .catch((err) => {
        setStatus('error');
        setError(err instanceof ApiError ? err.message : 'Verification failed');
      });
  }, [token]);

  if (status === 'verifying') return <p>Verifying your email...</p>;
  if (status === 'success') return <p>Email verified! You can now sign in.</p>;
  return <p className="error-banner">{error}</p>;
}

export default VerifyEmailPage;