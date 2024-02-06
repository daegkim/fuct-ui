import { useModal } from './lib/components/modal';
import FuctConfirm from './lib/components/modal/FuctConfirm';
import Toast, { useFuctToast } from './lib/components/toast/FuctToast';

function App() {
  const { showToast } = useFuctToast();
  const { openModal } = useModal();

  return (
    <div>
      <button
        onClick={async () => {
          const result = await openModal<boolean>(
            <FuctConfirm>
              <div style={{ width: '200px' }}>저장하시겠습니까?</div>
            </FuctConfirm>
          );

          if (result) {
            showToast('저장에 성공하였습니다.', { duration: 2000, color: 'red', position: 'top' });
          } else {
            showToast('취소하였습니다.', { duration: 2000, color: 'red', position: 'top' });
          }
        }}
      >
        click
      </button>
      <Toast />
    </div>
  );
}

export default App;
