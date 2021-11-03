```javascript
import OutsideClickHandler from 'react-outside-click-handler';

function MyComponent() {
    return (
        <OutsideClickHandler
            onOutsideClick={() => {
                alert("Trigger");
            }}
        >
            Hello World
        </OutsideClickHandler>
    );
}
```
