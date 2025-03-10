import { Box, Container, CssBaseline, Stack, styled } from '@mui/material';
import CreateTaskMenu from './components/create-task-menu';
import { CustomModal } from './components/dialogs/custom-dialog';
import Header from './components/header';
import TaskList from './components/task-list';
import { useModal } from './hooks/use-modal';

const BackgroundBox = styled(Box)`
  position: fixed;
  inset: 0;
  z-index: -1;
  background-color: #0a0a0a;
  background-image:
    radial-gradient(
      circle at top left,
      RGBA(154, 68, 255, 0.5) 0%,
      transparent 70%
    ),
    linear-gradient(to bottom right, RGBA(0, 0, 0, 0.4) 50%, transparent 100%),
    radial-gradient(
      circle at bottom right,
      RGBA(55, 2, 105, 0.7) 0%,
      transparent 70%
    ),
    repeating-linear-gradient(
      rgba(255, 255, 255, 0.05) 0px,
      rgba(255, 255, 255, 0.05) 1px,
      transparent 1px,
      transparent 80px
    ),
    repeating-linear-gradient(
      to right,
      rgba(255, 255, 255, 0.05) 0px,
      rgba(255, 255, 255, 0.05) 1px,
      transparent 1px,
      transparent 80px
    );
  background-size: 100% 100%;
  background-position: center;
  pointer-events: none;
`;

function App() {
  const { closeModal, isModalOpen, modalProps } = useModal();

  return (
    <Stack height="100vh" justifyContent="center" overflow="hidden">
      <CssBaseline enableColorScheme />
      <BackgroundBox />

      <Container maxWidth={'md'}>
        <Stack spacing={4} justifyContent="center" my={12}>
          <Header />

          <Stack component="main" gap={2}>
            <CreateTaskMenu />
            <TaskList />
          </Stack>
        </Stack>
      </Container>

      <CustomModal
        isModalOpen={isModalOpen}
        onClose={closeModal}
        title={modalProps?.title || ''}
        children={modalProps?.children}
      />
    </Stack>
  );
}

export default App;
