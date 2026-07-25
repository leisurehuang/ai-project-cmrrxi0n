import { request } from './request';

// 任务 VO 类型定义（与后端 backend/src/modules/tasks/dto/task.vo.ts 对齐）
export interface TaskVo {
  id: string;
  parentId: string;
  title: string;
  frequency: 'DAILY' | 'WEEKLY';
  rewardPoints: number;
  isActive: boolean;
  createdAt: string;
}

/**
 * 获取任务列表
 */
export const getTasksApi = (isActive?: boolean) => {
  return request<TaskVo[]>({
    url: '/tasks',
    method: 'GET',
    data: isActive === undefined ? {} : { isActive },
  });
};

/**
 * 创建任务
 */
export const createTaskApi = (data: {
  title: string;
  frequency: 'DAILY' | 'WEEKLY';
  rewardPoints: number;
}) => {
  return request<TaskVo>({
    url: '/tasks',
    method: 'POST',
    data,
  });
};
