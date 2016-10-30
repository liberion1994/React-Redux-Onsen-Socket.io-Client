/**
 * Created by liboyuan on 2016/10/13.
 */

export const AgentStatus = {
    UNINITIATED: '初始化',
    CONNECTING: '通信中',
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

export const Socket = {
    UNINITIATED: '初始化',
    TIMEOUT: '无响应',
    CONNECTED: '已连接',
    DISCONNECTED: '未连接'
};

export const Hall = {
    UNFETCHED: '未获取',
    REQUESTED: '已请求',
    FETCHED: '已获取',
    FAILED: '获取失败'
};

export const Game = {
    UNFETCHED: '未获取',
    REQUESTED: '已请求',
    FETCHED: '已获取',
    FAILED: '获取失败',
    NONE: '未在游戏中'
};

export const MessageSent = {
    NONE_OR_DONE: '无消息发送或发送成功',
    REQUESTED: '已请求',
    FAILED: '发送失败'
};

export const OperationSent = {
    NONE_OR_DONE: '无操作发送或发送成功',
    REQUESTED: '已请求',
    FAILED: '发送失败'
};

const exampleState = {
    socket: {
        state: Socket.CONNECTED
    },
    auth: {
        state: Authentication.UNAUTHENTICATED
    },

    agent: {
        state: AgentStatus.HALL
    },

    hall: {
        state: Hall.FETCHED,
        content: {
            eventId: 0,
            tables: []
        },
        chats: {
            newArrived: false,
            content: []
        }
    },

    table: {
        state: Game.FETCHED
    }

};