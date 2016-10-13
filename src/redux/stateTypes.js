/**
 * Created by liboyuan on 2016/10/13.
 */

export const AgentStatus = {
    HALL: '大厅',
    UNPREPARED: '未准备',
    PREPARED: '已准备',
    IN_GAME: '游戏中',
    OBSERVING: '观战中'
};

export const PageLocation = {
    HALL: '大厅',
    GAME: '游戏',
    PLAYERS: '玩家',
    SETTINGS: '设置'
};

export const Authentication = {
    UNAUTHENTICATED: '尚未验证',
    REQUESTED: '已请求',
    AUTHENTICATED: '已验证',
    FAILED: '验证失败'
};

const exampleState = {
    auth: Authentication.UNAUTHENTICATED,
    pageLocation: PageLocation.PLAYERS,
    agentStatus: AgentStatus.HALL,
    tables: {
        eventId: 0,
        content: []
    },
    table: {
        eventId: 0,
        seats: [],
        game: null
    },
    players: {
        updatedAt: new Date(),
        content: []
    },
    settings: {

    }
};