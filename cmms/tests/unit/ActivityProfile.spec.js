import { mount, createLocalVue } from '@vue/test-utils'
import ActivityProfile from '@/components/Activity/ActivityProfile'
import Vuetify from "vuetify";
import Vue from "vue";
import router from "@/router"

describe('ActivityProfile', () => {
  beforeEach(() => {
    Vue.use(Vuetify)
    Vue.use(router)
  })

  it('create', () => {
    const wrapper = mount(ActivityProfile, {
      router,
      propsData: {
        status: '状态',
        title: '标题',
        description: '描述',
        startTime: '开始时间',
        endTime: '结束时间',
        location: '地点',
        detailLink: '详细信息链接',
      }
    })
    const text = wrapper.text()
    expect(text).toContain('状态')
    expect(text).toContain('标题')
    expect(text).toContain('描述')
    expect(text).toContain('开始时间')
    expect(text).toContain('结束时间')
    expect(text).toContain('地点')
    expect(text).toContain('详细信息链接')
  })
})
