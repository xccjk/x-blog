
<!--
 * @Author: your name
 * @Date: 2020-05-07 14:19:32
 * @LastEditTime: 2020-05-08 13:56:58
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /doc/react.md
 -->
1. 属性展开 - 保留当前组件需要的props，并且使其他的props传递下去
```
  var obj = {a: 1, b: 2, c: 3, d: 4, e: 5}
  const { a, ...other } = obj
  console.log(other)  // {b: 2, c: 3, d: 4, e: 5}
```
2. 在react中，界面完全由数据驱动
3. 在react中，一切都是组件
4. props是react组件之间通讯的基本方式

```
  // 可以实现记录用户访问路径操作信息，每次进入某个页面或者功能的时候都会访问一个线上资源
  // a.js
  export default Beacon extends React.Component {
    componentDidMount() {
      const beacon = new Image()
      beacon.src = 'https://sxc.image/i.png'
    }
    
    render() {
      return null
    }
  }
  // b.js
  render() {
    <div>
      <Beacon/>
    </div>
  }

```

```
  // 代码组织方式优化 - renderXXX函数访问的是同样的props和state，代码耦合严重
  class StopWatch extends React.Component {

    renderClock() {

    }

    renderButtons() {

    }

    renderSplitTimes() {

    }
    
    render() {
      const Clock = this.renderClock()
      const Buttons = this.renderButtons()
      const SplitTimes = this.renderSplitTimes()

      return (
        <div>
          {Clock}
          {Buttons}
          {SplitTimes}
        </div>
      )
    }
  }
  // 更好的组织方式
  class StopWatch extends React.Component {
    render() {
      return (
        <div>
          <Clock />
          <Buttons />
          <SplitTimes />
        </div>
      )
    }
  }
  const Clock = (props) = {

  }
  const Buttons = (props) => {

  }
  const SplitTimes = (props) => {

  }
```


- 2.1
  - 2.1.1 设计react组件原则及最佳实践
    - 1. 保持接口小，props数量要少
    - 2. 根据数据边界来划分组件，充分利用组合
    - 3. 把state往上层组件提取，让下层组件只需要实现为纯函数
    - 4. 避免renderXXXX函数
    - 5. 给回调函数类型的props加统一前缀，比如on or handle - onStart
    - 6. 使用propTypes来定义组件的props
    - 7. 尽量每个组件都有自己专属的文件
    - 8. 用解构赋值的方式获取参数props的属性 - const { a, b } = { a: 1, b: 2 }
    - 9. 利用属性初始化来定义state和成员函数 - 给默认值 const { data = [] } = this.props


```
  /*
    1. 尽量不要在jsx中写内联函数
    2. 每次渲染，都会产生新的函数对象
    3. 每次传给组件的props(方法，数据，状态等)都是新的，无法通过shouldComponentUpdate对props的检查来避免重复渲染
  */
  <Buttons
    activated={this.state.isStarted}
    onStart={() => {/* TODO */}}
    onReset={() => {/* TODO */}}
  />
```

```
  /*
    1. style属性的使用
    2. 内联样式在组件每次渲染时都会创建一个新的style对象
    3. 如果样式不发生改变，应该把style对象提取到组件之外，可以重用一个对象
  */
  // bad
  const Clock = (props) => {
    return <h1 style={color: '#ccc'}>小姐姐真好看<h1/>
  }
  // good
  const style = {
    color: '#ccc'
  }
  const Clock = (props) => {
    return <h1 style={style}>小姐姐真好看<h1/>
  }
```

- 3.1
  - 3.1.1
    - 1. 不同组件中相同的元素样式相互影响，a.js与b.js中都有h1组件，样式之间会相互影响
    - 2. 添加styled-jsx/styled-component支持

```
  a.js
  index.css
  h1: {
    color: red
  }
  <h1>a</h1>
  b.js
  <h1>b</h1>
  
  a.js
  .a h1: {
    color: red
  }
  <div className='a'>
    <h1>a</h1>
  <div/>
  b.js
  <div className='b'>
    <h1>a</h1>
  <div/>
```


- 4.1
  - 4.1.1 状态组件与无状态组件分割
    - 1. 软件设计原则"责任分离"，就是让一个模块责任尽量少，每个模块专注于一个功能，有利于代码的维护
    - 2. react中数据渲染页面，UI = f(data)，但是尽量把获取和管理数据与界面渲染分开，即把获取数据与管理数据的逻辑放在父组件，把渲染界面的逻辑放在子组件
    - 3. A组件渲染B组件时，即使props传入一样，B组件也会完整走一遍渲染流程
    - 4. 函数形式的react组件，好处是不需要管理state，占用资源少，但是函数组件无法利用shouldComponentUpdate来优化减少渲染
    - 5. PureComponent中实现的shouldComponentUpdate会对传入的参数进行浅比较，当传入的props为一个对象之类的，比如由{a: 1, b: 2} => {a: 2, b: 2}，可能会出现UI未更新的情况出现
    - 6. shouldComponentUpdate函数，每次渲染render函数之前会被调用，返回true继续渲染，返回false立刻停止，可以对深层次的数据处理
    - 7. 在使用PureComponent时，尽量在render定义之外创建所有对象，数组和函数，并确保在各种调用间，不发生更改 - 参考table例子
    - 8. React.memo浅比较


```
  export default class A extends React.Component {
    state = {
      joke: null
    }

    componentDidMount() {
      fetch(url, {header: {'Accept': 'application/json'}})
        .then(res => {
          return res.json()
        })
        .then(json => {
          this.setState({joke: json.joke})
        })
    }

    render() {
      return <B value={this.state.joke} />
    }
  }

  export default class B extends React.Component {
    render() {
      return (
        <div>
          <img src={url} />
          {this.props.value || 'loading...'}
        </div>
      )
    }
  }
```

```
  <Table
    // map每次返回一个新数组，浅比较失败
    rows={rows.map()}
    // 枚举对象总不相同 - 尽量不写行内样式
    style={{color: '#ccc'}}
    // 箭头函数每次都会重新渲染 - 组件层级不通过箭头函数绑定事件
    onUpdate={() => {}}
  />
```


- 5.1
  - 5.1.1 高阶组件



- 6.1
  - 6.1.1 render props模式
    - 1. render props的形式
    - 2. render props其实就是依赖注入
    - 3. 如何利用render props实现共享组件之间的逻辑
    - 4. 依赖注入：**当逻辑A依赖逻辑B时，如果让A直接依赖B，A做不到通用。依赖注入就是把B的逻辑以函数形式传递给A，让A和B之间只需要对函数接口达成一致 - 组件A和B之间，不是把B组件写在A组件中，而是通过把B组件当参数传到A组件当中**


```
  // 用户登录与未登录情况下显示不同的组件
  const Auth = (props) => {
    const userName = getUserName()
    if(userName) {
      const allProps = {userName, ...props}
      return (
        <React.Fragment>
          {props.login(allProps)}
        </React.Fragment>
      )
    } else {
      return (
        <React.Fragment>
          {props.noLogin(props)}
        </React.Fragment>
      )
    }
  }

  <Auth
    login={({userName}) => <h1>Hello {userName}</h1>}
    noLogin={() => <h1>Please login</h1>}
  />
```


- 7.1 提供者模式
  - 7.1.1
    - 1. 提供者模式，为了**解决组件间跨层级的信息传递**，A-B-C-D-...-X，当数据要从A传递到X时，通过props传递时，会经过B-C-D...，然而在B-C-D...中不需要使用props中的数据，而且组件在变动时，容易出现props传递错误的情况出现
    - 2. 提供者模式，本质由2个角色组成，一个叫‘提供者’，一个叫‘消费者’，提供者(A)位于组件树靠上的位置，消费者(X)处于靠下的位置
    - 3. 实现方式，通过**react提供的context功能进行实现(v16.3.0+)，context功能可以创造一个‘上下文’，在这个上下文之中的所有组件都可以访问到同样的数据**
    - 4. 参考react-app中x2代码


- 8.1 组合组件
  - 8.1.1
    - 1. 模式(Pattern) = 问题场景(Context) + 解决方法(Solution)
    - 2. 解决的问题，**父组件想传递一些信息给子组件，但是通过props传递又很麻烦时**


- 9.1 组件状态
  - 9.1.1
    - 1. UI = f(data)，data = props + state，props代表外部传进来的数据，state代表组件内部状态
    - 2. 什么样的数据可以存放在成员变量中？
    - 3. 如果数据由外部传入，放在props中
    - 4. **如果是内部组件数据，这个数据的更改是否应该立刻引发一次组件的重新渲染，如果是，放在state中，不是就放在成员变量中**
    - 5. state不会被同步修改，在react的生命周期中或者处理函数中同步调用，setState不会立即同步state和重复渲染，但是如果setState由其他条件引发，就有可能不是这样了 - 在生命周期中或者事件函数中调用时，react会打开一个类似标记的东西，标记打开的过程中，setState调用都是往任务队列里放任务，当函数调用结束时，批量处理任务队列，关闭标记
    - 6. 函数式setState -  当setState的第一个参数为函数时，任务列表上增加的就是一个可执行的任务函数，react没处理完一个任务，都会更新一次state，然后把新的state传递给这个任务函数


```
  // 代码1
  class Foo extends Component {
    foo = 'foo'

    render() {
      return <div>{this.foo}</>
    }
  }
  // 代码2
  this.state = {
    count: 0
  }

  this.setState({count: 1})
  console.log(this.state.count) // 0
  // 代码3
  setTimeout(() => {
    this.setState({count: 2})
    console.log(this.state.count) // 2
  })
  // 代码4 - 结果为1 三个任务都给了this.state.count一个值
  this.state = {
    count: 0
  }
  this.setState({count: this.state.count + 1})
  this.setState({count: this.state.count + 1})
  this.setState({count: this.state.count + 1})
  // 代码5 - 函数式setState，结果为3
  // this.setState((preState, props) => ({})
  function increment(state, props) {
    return {count: state.count + 1}
  }
  this.state = {
    count: 0
  }
  this.setState(increment)
  this.setState(increment)
  this.setState(increment)
```

- 10.1 redux使用模式
  - 10.1.1
    - 1. 使用场景 - 复杂应用下的状态维护，类似于一个全局的store，**并且store只有接受某些‘事件’(action)，才可以修改store上的数据，store对这些‘事件’的响应，就是修改状态(修改状态的函数reducer)**
    - 2. 事件(action) - 响应函数(reducer) -store
    - 3. 对于某个状态，是放在store中还是组件自身状态中？
    - 4. 看状态是否会被多个react组件共享 - 不同级组件件的数据共享
    - 5. 看这个组件被unmount之后重新被mount，之前的状态是否需要保留 - 组件销毁后又重新渲染，之前的输入是否要保留
    - 6. 代码组织方式 - 基于角色分类(modal,services,view,action,reducer)和基于功能分类(安装功能所在模块分类)
    - 7. connect函数接受两个参数，一个mapStateToProps是把Store上的state映射为props，另一个mapDispatchToProps是把回调函数类型的props映射为派发action，connect函数调用会产生一个‘高阶组件’
    - 8. react-redux中使用了三个模式 - 提供者模式，高阶组件，有状态组件和无状态组件
  

```
  // 代码1
  import { createStore } from 'redux'
  import { Provider } from 'react-redux'
  import store from './store'

  const store = createStore(store)

  <Provider store={store}>
    {Provider之下的所有组件都可以connect到给定的store}
  </Provider>
  // 代码2
  const Button = ({count, onIncrement}) => {
    return (
      <div>
        <div>{count}</div>
        <button onClick={onIncrement}>+</button>
      </div>
    )
  }
  // 代码3
  import { connect } from 'react-redux'

  const mapStateToProps = (state) => {
    return {
      count: count + 1
    }
  }

  const mapDispatchToProps = (dispatch) => {
    onIncrement: () => dispatch({type: 'INCREMENT'})
  }

  const Counter = connect(mapStateToProps, mapDispatchToProps)(Button)
```


- 11.1 mobx使用模式
  - 11.1.1


- 12.1 redux与mobx模式对比
  - 12.1.1


- 13.1 路由 react router
  - 13.1.1
    - 1. 单页应用 - 把URL映射到对应的页面来处理，页面之间切换做到局部更新
    - 2. 动态路由 - 指的路由规则不是预先确定的，而是在渲染过程中确定的(React Router v4)
    - 3. 静态路由 - 路由规则是固定的