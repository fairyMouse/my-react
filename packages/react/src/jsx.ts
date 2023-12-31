import { REACT_ELEMENT_TYPE } from 'shared/ReactSymbols';
import type {
	ElementType,
	Key,
	Props,
	ReactElementType,
	Ref
} from 'shared/ReactTypes';

const ReactElement = function (
	type: ElementType,
	key: Key,
	ref: Ref,
	props: Props
): ReactElementType {
	const element = {
		$$typeof: REACT_ELEMENT_TYPE,
		type,
		key,
		ref,
		props,
		__mark: 'feihan' // 和真实的react项目区分一下
	};
	return element;
};

export function jsx(type: ElementType, config: any, ...maybeChildren: any) {
	// NOTE: 此处的 jsx 方法统一了 React.createElement 的处理
	// 实际情况下，两者的实现不相同

	const props: Props = {};

	let key: Key = null;
	let ref: Ref = null;
	for (const propName in config) {
		// 筛选出 key 和 ref，其他的都作为 props
		const val = config[propName];
		if (propName === 'key') {
			if (val !== undefined) {
				key = `${val}`;
			}
		} else if (propName === 'ref') {
			if (val !== undefined) {
				ref = val;
			}
		} else if ({}.hasOwnProperty.call(config, propName)) {
			// 非原型链上的属性会被添加到 props 中
			props[propName] = val;
		}
	}

	const maybeChildrenLength = maybeChildren.length;
	if (maybeChildrenLength) {
		if (maybeChildrenLength === 1) {
			props.children = maybeChildren[0];
		} else {
			props.children = maybeChildren;
		}
	}
	return ReactElement(type, key, ref, props);
}

export function jsxDEV(type: ElementType, config: any) {
	// 真实的react会在这里做一些额外的检查
	return jsx(type, config);
}
