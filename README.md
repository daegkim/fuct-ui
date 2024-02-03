# FUCT UI

## FuctProvider

토스트, 모달과 같이 전역적으로 상태를 관리하는 컴포넌트를 사용하기 위해서 FuctProvider를 Root단에 추가해주세요.

## Toast

전역적으로 Toast를 관리할 수 있는 hook을 제공합니다.  
여러분만의 Toast Component를 만들어서 원하는 곳에 위치시킵니다.

```javascript
// index.tsx
<FuctProvider>
  <App />
  <YourComponent />
</FuctProvider>
```

당신의 Toast 컴포넌트는 아래와 같이 `useToastComponent`라는 hook을 사용하여 컨트롤 합니다.

```javascript
// YourComponent.tsx
function YourComponent() {
  const { isOpen, message, options } = useToastComponent();

  ...

  if (!isOpen) {
    return null;
  }

  return <div {...options}>{message}</div>
}
```

Toast를 띄우기 위해서는 `useToast`라는 hook의 showToast를 사용하기만 하면 됩니다. option에 추가한 duration만큼 화면에서 유지되며 그 이후에는 닫히게 됩니다.

```javascript
// App.tsx
function App() {
  const { showToast } = useToast();

  const handleClick = () => {
    showToast('success', { duration: 3000 });
  };

  return <button onClick={handleClick}>click</button>;
}
```

물론 Toast 컴포넌트를 만들기 귀찮을 수 있습니다. 그래서 `<FuctToast />`라는 컴포넌트도 제공합니다. 이 컴포넌트는 `useFuctToast`라는 hook의 `showToast`를 사용하세요.

## Modal

개발 중입니다. 토스트와 마찬가지로 개발될 예정입니다.
