import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0';
import {Task, TaskPropsType} from "./Task";
import {action} from "@storybook/addon-actions";
import {TaskPriorities, TaskStatuses} from "../../../../api/todolists-api";

export default {
  title: 'Todolist/Task',
  component: Task,
} as Meta;

const removeTask = action('Remove task')
const changeTaskStatus = action('Change status')
const changeTaskTitle = action('Change title')

const Template: Story<TaskPropsType> = (args) => <Task {...args} />;

const baseArgs = {
    removeTask,
    changeTaskStatus,
    changeTaskTitle
}

export const TaskIsDoneExample = Template.bind({});
TaskIsDoneExample.args = {
  ...baseArgs,
    task: {
        id: '1',
        title: 'React',
        description: '',
        todoListId: '',
        order: 0,
        status: 2,
        priority: 0,
        startDate: '',
        deadline: '',
        addedDate: ''
       }
};

export const TaskIsNotDoneExample = Template.bind({});
TaskIsNotDoneExample.args = {
    ...baseArgs,
    task: {id: '1',
        title: 'React',
        description: '',
        todoListId: '',
        order: 0,
        status: 0,
        priority: 0,
        startDate: '',
        deadline: '',
        addedDate: ''
    }
};

export const TaskDisabledExample = Template.bind({});
TaskDisabledExample.args = {
    ...baseArgs,
    task: {id: '1',
        title: 'React',
        description: '',
        todoListId: '',
        order: 0,
        status: 0,
        priority: 0,
        startDate: '',
        deadline: '',
        addedDate: ''
    },
    disabled: true
};
