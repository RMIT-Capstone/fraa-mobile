const MOCK_SESSIONS = [
  {
    validOn: '2020-09-19T08:20:00.043Z',
    courseName: 'Capstone Project - Part A',
    createdAt: '2020-09-19T08:21:30.644Z',
    expireOn: '2020-09-19T08:20:00.043Z',
    courseCode: 'OENG1183',
    lecturer: 'Yossi Nygate',
    id: 'R3Z69QewrcoIsaaVATOJ',
    location: 'SGS/2.4.041 (Lab-Mac)',
  },
  {
    expireOn: '2020-09-19T08:20:00.043Z',
    courseCode: 'COSC2081',
    courseName: 'Programming 1',
    validOn: '2020-09-19T08:20:00.043Z',
    createdAt: '2020-09-19T06:19:49.617Z',
    lecturer: 'Thanh Nguyen Ngoc',
    id: 'l50b0ytzedIdZtg1jiWL',
    location: 'SGS/2.4.041 (Lab-Mac)',
  },
  {
    createdAt: '2020-09-19T06:21:35.887Z',
    validOn: '2020-09-20T06:20:00.043Z',
    courseCode: 'OENG1183',
    expireOn: '2020-09-20T06:20:00.043Z',
    lecturer: 'Yossi Nygate',
    courseName: 'Capstone Project - Part A',
    id: 'MTSIKDBY7ZJcpbANGQ8F',
    location: 'SGS/2.4.041 (Lab-Mac)',
  },
  {
    validOn: '2020-09-20T06:20:00.043Z',
    lecturer: 'Thanh Nguyen Ngoc',
    createdAt: '2020-09-19T06:20:12.398Z',
    courseName: 'Programming 1',
    expireOn: '2020-09-20T06:20:00.043Z',
    courseCode: 'COSC2081',
    id: 'Tm0gjxdmFHl7WVzWV5Lv',
    location: 'SGS/2.4.041 (Lab-Mac)',
  },
  {
    courseName: 'Programming 1',
    expireOn: '2020-09-21T06:20:00.043Z',
    createdAt: '2020-09-19T06:20:16.207Z',
    lecturer: 'Thanh Nguyen Ngoc',
    validOn: '2020-09-21T06:20:00.043Z',
    courseCode: 'COSC2081',
    id: '25USKV0HAVNLWu5ZjDHh',
    location: 'SGS/2.4.041 (Lab-Mac)',
  },
  {
    lecturer: 'Yossi Nygate',
    validOn: '2020-09-21T06:20:00.043Z',
    createdAt: '2020-09-19T06:21:40.407Z',
    expireOn: '2020-09-21T06:20:00.043Z',
    courseName: 'Capstone Project - Part A',
    courseCode: 'OENG1183',
    id: 'ZKHwGUwNJcN4URX0q18U',
    location: 'SGS/2.4.041 (Lab-Mac)',
  },
  {
    expireOn: '2020-09-22T06:20:00.043Z',
    createdAt: '2020-09-19T06:21:43.764Z',
    lecturer: 'Yossi Nygate',
    courseCode: 'OENG1183',
    validOn: '2020-09-22T06:20:00.043Z',
    courseName: 'Capstone Project - Part A',
    id: '5tlWe8Z2XXLtPiVy0NnL',
    location: 'SGS/2.4.041 (Lab-Mac)',
  },
  {
    courseName: 'Programming 1',
    validOn: '2020-09-22T06:20:00.043Z',
    expireOn: '2020-09-22T06:20:00.043Z',
    lecturer: 'Thanh Nguyen Ngoc',
    createdAt: '2020-09-19T06:20:21.626Z',
    courseCode: 'COSC2081',
    id: 'eSioQ4HONdYzonAdxl14',
    location: 'SGS/2.4.041 (Lab-Mac)',
  },
  {
    courseName: 'Capstone Project - Part A',
    expireOn: '2020-09-23T06:20:00.043Z',
    validOn: '2020-09-23T06:20:00.043Z',
    courseCode: 'OENG1183',
    createdAt: '2020-09-19T06:21:48.565Z',
    lecturer: 'Yossi Nygate',
    id: '6sRTs6pVlWXiuAiPM6pB',
    location: 'SGS/2.4.041 (Lab-Mac)',
  },
  {
    courseName: 'Programming 1',
    validOn: '2020-09-23T06:20:00.043Z',
    expireOn: '2020-09-23T06:20:00.043Z',
    createdAt: '2020-09-19T06:20:24.681Z',
    lecturer: 'Thanh Nguyen Ngoc',
    courseCode: 'COSC2081',
    id: 'qOa0fq2K4fCRxUqwPOQg',
    location: 'SGS/2.4.041 (Lab-Mac)',
  },
  {
    lecturer: 'Thanh Nguyen Ngoc',
    courseCode: 'COSC2081',
    createdAt: '2020-09-19T06:20:28.506Z',
    expireOn: '2020-09-24T06:20:00.043Z',
    courseName: 'Programming 1',
    validOn: '2020-09-24T06:20:00.043Z',
    id: 'WWXs2hu0z5yHoY2NIZjA',
    location: 'SGS/2.4.041 (Lab-Mac)',
  },
  {
    createdAt: '2020-09-19T06:21:52.266Z',
    validOn: '2020-09-24T06:20:00.043Z',
    expireOn: '2020-09-24T06:20:00.043Z',
    courseCode: 'OENG1183',
    lecturer: 'Yossi Nygate',
    courseName: 'Capstone Project - Part A',
    id: 'ed7WbAbdVhOZijuaPxKK',
    location: 'SGS/2.4.041 (Lab-Mac)',
  },
  {
    expireOn: '2020-09-25T06:20:00.043Z',
    lecturer: 'Thanh Nguyen Ngoc',
    courseCode: 'COSC2081',
    createdAt: '2020-09-19T06:20:31.833Z',
    validOn: '2020-09-25T06:20:00.043Z',
    courseName: 'Programming 1',
    id: 'NmvLfo84jh9ik99Uz85z',
    location: 'SGS/2.4.041 (Lab-Mac)',
  },
];

export default MOCK_SESSIONS;