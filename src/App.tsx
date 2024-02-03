import ModalLayout from './ModalLayout';
import { useModal } from './lib/components/modal';
import Toast, { useFuctToast } from './lib/components/toast/FuctToast';

function App() {
  const { showToast } = useFuctToast();
  const { openModal } = useModal();

  return (
    <div>
      <button
        onClick={async () => {
          showToast('저장에 성공하였습니다.', { duration: 2000, color: 'red', position: 'top' });
          const result = await openModal<{ name: string }>(
            <ModalLayout>
              <div>hello world</div>
            </ModalLayout>
          );
          console.log(result);
        }}
      >
        click
      </button>
      <Toast />
    </div>
  );
}

export default App;
