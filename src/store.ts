import { createStore } from 'vuex'
import { testData, testPosts, ColumnProps, PostProps } from '../testData'

export interface UserProps {
  isLogin: boolean;
  name?: string;
  id?: number;
  columnId?: number
}

export interface GlobalDataProps {
  columns: ColumnProps[];
  posts: PostProps[];
  user: UserProps;
}
const store = createStore<GlobalDataProps>({
  state: {
    columns: testData,
    posts: testPosts,
    user: { isLogin: true, name: 'xiaomin', columnId: 1 }
  },
  mutations: {
    login(state) {
      state.user = { ...state.user, isLogin: true, name: '小明' }
    },
    createPost(state, newPost) {
      state.posts.push(newPost)
    }
  },
  getters: {
    biggerColumnLen(state) {
      return state.columns.filter(c => c.id > 2).length
    },
    // 需要传入参数的getters的写法
    // 找到与当前专栏相同的那条数据
    getColumnById: (state) => (id: number) => {
      return state.columns.find(c => c.id === id)
    },
    // 过滤当前专栏下的数据
    getPostById: (state) => (cid: number) => {
      return state.posts.filter(post => post.columnId === cid)
    }
  }
})

export default store