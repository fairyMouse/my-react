import { jsx } from './src/jsx';

console.log(
	jsx('div', {
		id: 'test',
		children: /*#__PURE__*/ jsx('div', {
			children: '111'
		})
	})
);

// export default {
// 	version: '0.0.1',
// 	createElement: jsx
// };
