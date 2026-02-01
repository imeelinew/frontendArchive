# Vue 基础知识点总结（1-10）

快速回顾 Vue 核心语法，每个知识点都有简洁的代码示例。

---

## 1. Hello World - Vue 实例化

**核心概念：** 创建 Vue 实例，挂载到 DOM 元素，使用插值语法 `{{}}` 显示数据。

```html
<div id="app">
    <h1>{{str}}</h1>
</div>

<script>
    new Vue({
        el: "#app",        // 挂载点（CSS选择器）
        data: {
            str: "Hello Vue!"  // 响应式数据
        }
    })
</script>
```

**要点：**
- `el` - 指定挂载的 DOM 元素
- `data` - 存放响应式数据
- `{{}}` - 插值语法，显示 data 中的数据

---

## 2. v-text 与 v-html

**核心概念：** 两种设置元素内容的指令。

| 指令 | 作用 | 类似于 |
|------|------|--------|
| `v-text` | 纯文本渲染 | `innerText` |
| `v-html` | HTML 渲染 | `innerHTML` |

```html
<div id="app">
    <div v-text="str"></div>   <!-- 输出: v-text -->
    <div v-html="str2"></div>  <!-- 输出: 大号标题 v-html -->
</div>

<script>
    new Vue({
        el: "#app",
        data: {
            str: "v-text",
            str2: "<h1>v-html</h1>"
        }
    })
</script>
```

---

## 3. v-bind - 动态绑定属性

**核心概念：** 将 HTML 属性值解析为变量。

```html
<!-- 完整写法 -->
<div v-bind:class="className">hello</div>

<!-- 缩写（推荐） -->
<div :class="className">hello</div>

<!-- 对象语法：根据条件添加 class -->
<div :class="{box1: isActive}">你好</div>
```

```javascript
data: {
    className: "box1",
    isActive: true  // box1 类会被添加
}
```

**常用场景：**
- `:class` - 动态 class
- `:style` - 动态样式
- `:src` - 动态图片路径
- `:href` - 动态链接

---

## 4. v-if / v-show - 条件渲染

### v-if / v-else-if / v-else

```html
<div v-if="loginName=='admin'">管理员</div>
<div v-else-if="loginName=='user'">普通用户</div>
<div v-else>未登录</div>
```

### v-show

```html
<div v-show="isLogin">已登录</div>
```

### 区别对比

| 特性 | v-if | v-show |
|------|------|--------|
| 渲染方式 | 条件为 false 时不渲染 DOM | 始终渲染，通过 `display:none` 隐藏 |
| 切换开销 | 高（每次都要创建/销毁） | 低 |
| 适用场景 | 条件很少改变 | 频繁切换 |

---

## 5. v-on - 事件绑定

**核心概念：** 绑定 DOM 事件，执行方法。

```html
<!-- 完整写法 -->
<button v-on:click="handleClick">按钮</button>

<!-- 缩写（推荐） -->
<button @click="handleClick">按钮</button>
```

### 事件修饰符

| 修饰符 | 作用 | 示例 |
|--------|------|------|
| `.stop` | 阻止事件冒泡 | `@click.stop="fn"` |
| `.prevent` | 阻止默认行为 | `@click.prevent="fn"` |

```html
<!-- 阻止冒泡 -->
<div @click.stop="handleClick">点击</div>

<!-- 阻止默认行为（如阻止表单提交、阻止链接跳转） -->
<a href="https://baidu.com" @click.prevent="handleLink">百度</a>
<div @contextmenu.prevent="handleMenu">右键菜单</div>
```

```javascript
methods: {
    handleClick() {
        this.str = "你好世界";
    }
}
```

---

## 6. v-for - 列表渲染

**核心概念：** 循环渲染数组或对象。

### 遍历数组

```html
<li v-for="(item, index) in list" :key="index">
    {{index}} - {{item}}
</li>
```

### 遍历对象

```html
<li v-for="(value, key) in obj" :key="key">
    {{key}}: {{value}}
</li>
```

### 遍历对象数组

```html
<li v-for="item in arr" :key="item.name">
    {{item.name}} - {{item.age}}
</li>
```

```javascript
data: {
    list: ["张三", "李四", "王五"],
    obj: { name: "张三", age: 18 },
    arr: [
        { name: "张三", age: 18 },
        { name: "李四", age: 19 }
    ]
}
```

⚠️ **必须添加 `:key` 属性**，绑定唯一值，提高渲染性能。

---

## 7. v-model - 双向数据绑定

**核心概念：** 表单元素与 data 数据双向同步。

```html
<input v-model="str" type="text">
<div>{{ str }}</div>
```

### 修饰符

| 修饰符 | 作用 |
|--------|------|
| `.lazy` | 在 change 事件时同步（失焦后），而非 input 时 |
| `.trim` | 去除首尾空格 |
| `.number` | 转为数字类型 |

```html
<input v-model.lazy="str">      <!-- 失焦后才同步 -->
<input v-model.trim="str">      <!-- 自动去空格 -->
<input v-model.number="num">    <!-- 转为数字 -->
```

---

## 8. 生命周期钩子

**核心概念：** Vue 实例从创建到销毁的过程，在关键节点自动调用对应钩子函数。

### 四个阶段八个钩子

| 阶段 | 钩子 | 说明 | 常见用途 |
|------|------|------|----------|
| **创建** | `beforeCreate` | data/methods 还未初始化 | 加载 loading |
| | `created` | data/methods 已可用 | ⭐ **发起 Ajax 请求** |
| **挂载** | `beforeMount` | 模板已编译，未挂载 DOM | - |
| | `mounted` | DOM 已挂载完成 | ⭐ **操作 DOM、初始化第三方库** |
| **更新** | `beforeUpdate` | 数据变了，DOM 还没更新 | 获取更新前的 DOM 状态 |
| | `updated` | 数据和 DOM 都更新完成 | 操作更新后的 DOM |
| **销毁** | `beforeDestroy` | 实例即将销毁 | ⭐ **清除定时器、解绑事件** |
| | `destroyed` | 实例已销毁 | 最后的清理工作 |

```javascript
new Vue({
    el: "#app",
    data: { count: 0 },
    
    created() {
        console.log("created: 可以发 Ajax 了");
    },
    
    mounted() {
        console.log("mounted: 可以操作 DOM 了");
    },
    
    beforeDestroy() {
        console.log("beforeDestroy: 清理定时器等");
    }
})
```

---

## 9. computed - 计算属性

**核心概念：** 根据已有数据计算出新数据，**有缓存**，依赖不变则不重新计算。

### 简写形式（只读）

```javascript
computed: {
    sum() {
        return this.num1 + this.num2;
    }
}
```

```html
<span>{{ sum }}</span>  <!-- 当变量使用 -->
```

### 完整写法（可读可写）

```javascript
computed: {
    fullName: {
        get() {
            return this.firstName + ' ' + this.lastName;
        },
        set(newValue) {
            const names = newValue.split(' ');
            this.firstName = names[0];
            this.lastName = names[1];
        }
    }
}
```

### computed vs methods

| 对比项 | computed | methods |
|--------|----------|---------|
| 缓存 | ✅ 有缓存，依赖不变不重新计算 | ❌ 每次调用都执行 |
| 使用方式 | 当变量用 `{{ sum }}` | 当方法用 `{{ getSum() }}` |
| 适用场景 | 基于现有数据派生新数据 | 事件处理、不需要缓存的操作 |

---

## 10. watch - 侦听器

**核心概念：** 监听 data 中数据的变化，执行相应操作。

### 基础用法（监听基本类型）

```javascript
watch: {
    num(newVal, oldVal) {
        console.log("新值:", newVal, "旧值:", oldVal);
    }
}
```

### 深度监听（监听数组/对象）

```javascript
watch: {
    arr: {
        deep: true,  // 深度监听
        handler(newVal, oldVal) {
            console.log("数组变了");
        }
    }
}
```

### Vue 2 数组响应式注意事项

```javascript
methods: {
    changeArr() {
        // ❌ 直接通过索引修改，Vue 2 检测不到
        this.arr[0] = 5;
        
        // ✅ 用 $set 修改，watch 能触发
        this.$set(this.arr, 0, 5);
    }
}
```

### watch vs computed

| 对比项 | watch | computed |
|--------|-------|----------|
| 作用 | 监听数据变化，执行副作用 | 派生新数据 |
| 适用场景 | 异步操作、开销较大的操作 | 同步计算 |
| 缓存 | ❌ 无 | ✅ 有 |

---

## 快速记忆表

| 指令/属性 | 作用 | 缩写 |
|-----------|------|------|
| `{{}}` | 插值显示 | - |
| `v-text` | 纯文本 | - |
| `v-html` | HTML渲染 | - |
| `v-bind` | 绑定属性 | `:` |
| `v-on` | 绑定事件 | `@` |
| `v-if` | 条件渲染 | - |
| `v-show` | 显示隐藏 | - |
| `v-for` | 列表渲染 | - |
| `v-model` | 双向绑定 | - |
| `computed` | 计算属性 | - |
| `watch` | 侦听器 | - |

---

*生成时间：2026-02-01*
