const MOCK_SESSIONS = [
  {
    attendees: ['trungduong0103@gmail.com'],
    courseCode: 'COSC2081',
    courseName: 'Programming 1',
    createdAt: '2020-09-04T06:32:23.517Z',
    expireOn: '2020-09-04T06:25:15.202Z',
    id: '4ISD6g56CAPBv4OSyDuk',
    lecturer: 'Thanh Nguyen Ngoc',
    validOn: '2020-09-04T06:20:15.202Z',
  },
  {
    courseCode: 'COSC2082',
    courseName: 'Advanced Programming Techniques',
    createdAt: '2020-09-04T08:16:04.050Z',
    expireOn: '2020-09-04T06:25:15.202Z',
    id: 'X5hs4M7H388CULVGV1bF',
    lecturer: 'Vladimir Mariano',
    validOn: '2020-09-04T06:20:15.202Z',
  },
  {
    courseCode: 'COSC2082',
    courseName: 'Advanced Programming Techniques',
    createdAt: '2020-09-04T08:16:08.539Z',
    expireOn: '2020-09-05T06:25:15.202Z',
    id: 'WkHjj6XKd6ddgCEhqAGn',
    lecturer: 'Vladimir Mariano',
    validOn: '2020-09-05T06:20:15.202Z',
  },
  {
    courseCode: 'COSC2081',
    courseName: 'Programming 1',
    createdAt: '2020-09-04T06:32:27.295Z',
    expireOn: '2020-09-05T06:25:15.202Z',
    id: 'j1fedzXkKfGAA8aHIn4K',
    lecturer: 'Thanh Nguyen Ngoc',
    validOn: '2020-09-05T06:20:15.202Z',
  },
  {
    courseCode: 'COSC2081',
    courseName: 'Programming 1',
    createdAt: '2020-09-04T06:32:32.283Z',
    expireOn: '2020-09-06T06:25:15.202Z',
    id: 'Cxv1k3DxGEDO9g4GpJHP',
    lecturer: 'Thanh Nguyen Ngoc',
    validOn: '2020-09-06T06:20:15.202Z',
  },
  {
    courseCode: 'COSC2082',
    courseName: 'Advanced Programming Techniques',
    createdAt: '2020-09-04T08:16:14.227Z',
    expireOn: '2020-09-06T06:25:15.202Z',
    id: 'IRtAoqQFJxLx3TNn2oee',
    lecturer: 'Vladimir Mariano',
    validOn: '2020-09-06T06:20:15.202Z',
  },
  {
    courseCode: 'COSC2082',
    courseName: 'Advanced Programming Techniques',
    createdAt: '2020-09-04T08:16:18.408Z',
    expireOn: '2020-09-07T06:25:15.202Z',
    id: 'MCPqCsKAUV96zbvzMCBq',
    lecturer: 'Vladimir Mariano',
    validOn: '2020-09-07T06:20:15.202Z',
  },
  {
    courseCode: 'COSC2081',
    courseName: 'Programming 1',
    createdAt: '2020-09-04T06:33:10.806Z',
    expireOn: '2020-09-07T06:25:15.202Z',
    id: 'g5zm6a51fhTYS5LQIfeg',
    lecturer: 'Thanh Nguyen Ngoc',
    validOn: '2020-09-07T06:20:15.202Z',
  },
  {
    courseCode: 'COSC2081',
    courseName: 'Programming 1',
    createdAt: '2020-09-04T14:28:13.417Z',
    expireOn: '2020-09-08T06:25:15.202Z',
    id: 'zi5qM3c9HMr3d5YcVvMr',
    lecturer: 'Thanh Nguyen Ngoc',
    validOn: '2020-09-08T06:20:15.202Z',
  },
  {
    courseCode: 'COSC2082',
    courseName: 'Advanced Programming Techniques',
    createdAt: '2020-09-04T08:16:18.408Z',
    expireOn: '2020-09-08T06:25:15.202Z',
    id: 'MCPqCsKAUV96zbvzMCBq',
    lecturer: 'Vladimir Mariano',
    validOn: '2020-09-08T06:20:15.202Z',
  },
  {
    courseCode: 'COSC2081',
    courseName: 'Programming 1',
    createdAt: '2020-09-04T14:28:43.711Z',
    expireOn: '2020-09-09T06:25:15.202Z',
    id: '7iLhk1fcJSjMN5xJYOxX',
    lecturer: 'Thanh Nguyen Ngoc',
    validOn: '2020-09-09T06:20:15.202Z',
  },
  {
    courseCode: 'COSC2082',
    courseName: 'Advanced Programming Techniques',
    createdAt: '2020-09-04T08:16:18.408Z',
    expireOn: '2020-09-09T06:25:15.202Z',
    id: 'MCPqCsKAUV96zbvzMCBq',
    lecturer: 'Vladimir Mariano',
    validOn: '2020-09-09T06:20:15.202Z',
  },
  {
    courseCode: 'COSC2081',
    courseName: 'Programming 1',
    createdAt: '2020-09-08T10:27:58.736Z',
    expireOn: '2020-09-09T06:25:15.202Z',
    id: 'FiI287AxcDZnk1MFcAD4',
    lecturer: 'Thanh Nguyen Ngoc',
    validOn: '2020-09-09T06:20:15.202Z',
  },
  {
    courseCode: 'COSC2082',
    courseName: 'Advanced Programming Techniques',
    createdAt: '2020-09-04T08:16:18.408Z',
    expireOn: '2020-09-09T06:25:15.202Z',
    id: 'MCPqCsKAUV96zbvzMCBq',
    lecturer: 'Vladimir Mariano',
    validOn: '2020-09-09T06:20:15.202Z',
  },
  {
    courseCode: 'COSC2081',
    courseName: 'Programming 1',
    createdAt: '2020-09-08T10:35:22.166Z',
    expireOn: '2020-09-08T10:50:43.615Z',
    id: 'o5O7LETieARbP3dmv7v1',
    lecturer: 'Thanh Nguyen Ngoc',
    validOn: '2020-09-10T10:40:00.000Z',
  },
  {
    courseCode: 'COSC2082',
    courseName: 'Advanced Programming Techniques',
    createdAt: '2020-09-04T08:16:18.408Z',
    expireOn: '2020-09-08T10:50:43.615Z',
    id: 'MCPqCsKAUV96zbvzMCBq',
    lecturer: 'Vladimir Mariano',
    validOn: '2020-09-10T10:40:00.000Z',
  },
  {
    courseCode: 'COSC2081',
    courseName: 'Programming 1',
    createdAt: '2020-09-08T10:35:22.166Z',
    expireOn: '2020-09-11T10:50:43.615Z',
    id: 'o5O7LETieARbP3dmv7v1',
    lecturer: 'Thanh Nguyen Ngoc',
    validOn: '2020-09-11T10:40:00.000Z',
  },
  {
    courseCode: 'COSC2082',
    courseName: 'Advanced Programming Techniques',
    createdAt: '2020-09-04T08:16:18.408Z',
    expireOn: '2020-09-11T10:50:43.615Z',
    id: 'MCPqCsKAUV96zbvzMCBq',
    lecturer: 'Vladimir Mariano',
    validOn: '2020-09-11T10:40:00.000Z',
  },
  {
    courseCode: 'COSC2081',
    courseName: 'Programming 1',
    createdAt: '2020-09-08T10:35:22.166Z',
    expireOn: '2020-09-12T10:50:43.615Z',
    id: 'o5O7LETieARbP3dmv7v1',
    lecturer: 'Thanh Nguyen Ngoc',
    validOn: '2020-09-12T10:40:00.000Z',
  },
  {
    courseCode: 'COSC2082',
    courseName: 'Advanced Programming Techniques',
    createdAt: '2020-09-04T08:16:18.408Z',
    expireOn: '2020-09-12T10:50:43.615Z',
    id: 'MCPqCsKAUV96zbvzMCBq',
    lecturer: 'Vladimir Mariano',
    validOn: '2020-09-12T10:40:00.000Z',
  },
];

export default MOCK_SESSIONS;
