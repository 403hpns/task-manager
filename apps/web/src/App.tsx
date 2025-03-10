import { Container, CssBaseline, Stack } from '@mui/material';
import { BackgroundBox } from './components/background-box';
import CreateTaskMenu from './components/create-task-menu';
import { CustomModal } from './components/dialogs/custom-dialog';
import Header from './components/header';
import TaskList from './components/task-list';
import { useModal } from './hooks/use-modal';

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
