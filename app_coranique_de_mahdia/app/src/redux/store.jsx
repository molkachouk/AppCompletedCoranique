import { configureStore } from '@reduxjs/toolkit';
import { userReducer } from './userRelated/userSlice';
 import { secretaryReducer } from './secretaryRelated/secretarySlice';
 import { teacherReducer } from './teacherRelated/teacherSlice';
 import{parentReducer} from './parentRelated/parentSlice';
 import { groupReducer } from './groupRelated/groupSlice';
import { eventReducer } from './eventRelated/eventSlice';
import { studentReducer } from './studentRelated/studentSlice';
// import { noticeReducer } from './noticeRelated/noticeSlice';
// import { sclassReducer } from './sclassRelated/sclassSlice';
// import { teacherReducer } from './teacherRelated/teacherSlice';
// import { complainReducer } from './complainRelated/complainSlice';

const store = configureStore({
    reducer: {
        user: userReducer,
        secretary: secretaryReducer,
        teacher: teacherReducer,
        parent: parentReducer,
        group: groupReducer,
        event:eventReducer,
        student:studentReducer
        // teacher: teacherReducer,
        // notice: noticeReducer,
        // complain: complainReducer,
        // sclass: sclassReducer
    },
});

export default store;
