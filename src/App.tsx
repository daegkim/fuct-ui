import Toast, { useFuctToast } from './lib/components/toast/FuctToast';

function App() {
  const { showToast } = useFuctToast();

  return (
    <div>
      <button
        onClick={() => {
          showToast('저장에 성공하였습니다.', { duration: 2000, color: 'red', position: 'top' });
        }}
      >
        click
      </button>
      <Toast />
    </div>
  );
}

export default App;
