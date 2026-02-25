// frontend/src/App.jsx
import { materialRenderers } from '@jsonforms/material-renderers';
import { JsonForms } from '@jsonforms/react';
import {
  Box,
  Button,
  CircularProgress,
  Container,
  createTheme,
  CssBaseline,
  Paper,
  ThemeProvider,
  Typography
} from '@mui/material';
import { useEffect, useState } from 'react';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#2563eb', // A modern royal blue
    },
    background: {
      default: '#f8fafc',
      paper: '#ffffff',
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h4: {
      fontWeight: 600,
      letterSpacing: '-0.02em',
      color: '#0f172a',
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 600,
          padding: '10px 24px',
          borderRadius: '8px',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
        },
      },
    },
  },
});

function App() {
  const [config, setConfig] = useState(null);
  const [data, setData] = useState({});
  const [complete, setComplete] = useState(false);

  // Fetch the schema (Configuration) on mount
  useEffect(() => {
    fetch('http://localhost:8000/api/step/intake')
      .then(res => res.json())
      .then(res => {
        setConfig(res);
        setData(res.initialData);
      })
      .catch(err => console.error("Error fetching schema:", err));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8000/api/submit/intake', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (response.headers.get('HX-Trigger') === 'workflow-complete') {
        setComplete(true);
      }
    } catch (err) {
      console.error("Error submitting form:", err);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #f0f4f8 0%, #d9e2ec 100%)',
          py: 4,
          px: 2,
        }}
      >
        <Container maxWidth="sm">
          <Paper
            elevation={3}
            sx={{
              p: { xs: 3, md: 5 },
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              gap: 3,
            }}
          >
            {complete ? (
              <Box textAlign="center" py={4}>
                <Typography variant="h4" color="primary" gutterBottom>
                  ✅ Workflow Step Complete!
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Your data has been successfully submitted and processed.
                </Typography>
              </Box>
            ) : !config ? (
              <Box display="flex" flexDirection="column" alignItems="center" py={8} gap={2}>
                <CircularProgress size={48} thickness={4} />
                <Typography variant="body1" color="text.secondary">
                  Loading Workflow Configuration...
                </Typography>
              </Box>
            ) : (
              <>
                <Typography variant="h4" component="h1" textAlign="center" gutterBottom>
                  Intake Workflow
                </Typography>
                <form onSubmit={handleSubmit}>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                    <Box sx={{
                      // jsonforms applies some margins, this helps reset the container nicely
                      '& .MuiTypography-root': { color: 'text.primary' }
                    }}>
                      <JsonForms
                        schema={config.schema}
                        uischema={config.uiSchema}
                        data={data}
                        renderers={materialRenderers}
                        onChange={({ data }) => setData(data)}
                      />
                    </Box>
                    <Box display="flex" justifyContent="flex-end" pt={2} mt={1} borderTop="1px solid" borderColor="divider">
                      <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        size="large"
                        fullWidth
                        disableElevation
                      >
                        Submit Step
                      </Button>
                    </Box>
                  </Box>
                </form>
              </>
            )}
          </Paper>
        </Container>
      </Box>
    </ThemeProvider>
  );
}

export default App;
