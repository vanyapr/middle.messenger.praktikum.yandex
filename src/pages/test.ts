// import Block from '../utils/Block';
// import Compiler from '../utils/Compiler';
//
// const tpl2 = `
//   <h2>{{text}}</h2>
// `;
//
// class Child extends Block {
//   render() {
//     const compiler = new Compiler(tpl2, this.props);
//     return compiler.compile();
//   }
// }
//
// const template = `
//     <div>
//         <h1>{{test}}</h1>
//         <div>{{children}}</div>
//     </div>
// `;
//
// class Test extends Block {
//   render() {
//     const compiler = new Compiler(template, this.props);
//     return compiler.compile();
//   }
// }
//
// const tpl = new Test({ test: 'text', children: new Child({ text: 'Оно работает' }) });
//
// // console.log(tpl);
//
// // const x = tpl.render();
//
// // document.body.insertAdjacentHTML('beforebegin', x);
// //
// // tpl.setProps({ test: 'Text changed' });
// // tpl.setProps({ test: 'text23' });
// // document.body.innerHTML = tpl.render();
// // tpl.setProps({ test: 'text42' });
// // tpl.setProps({ test: 'text42' });
// // tpl.setProps({ test: 'text32' });
