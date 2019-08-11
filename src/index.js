//import(/* webpackChunkName:"lodash" */ 'lodash'); 此注释在打包时可以生产指定文件名的JS文件
//import(/* webpackPrefetch: true */ './click.js'); 此注释会在网络空闲时间时加载引入文件

document.addEventListener('click', () => {
    import(/* webpackPrefetch: true */ './click.js').then(({default: func}) => {
        func();
	})
})

async function getComponent() {
	const { default: _ } = await import(/* webpackChunkName:"lodash" */ 'lodash');
	const element = document.createElement('div');
	element.innerHTML = _.join(['Dell', 'Lee'], '-');
	return element;
}

document.addEventListener('click', () =>{
	getComponent().then(element => {
		document.body.appendChild(element);
	});
})
