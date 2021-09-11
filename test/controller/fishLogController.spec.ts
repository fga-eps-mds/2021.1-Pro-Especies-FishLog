import { Response, Request } from 'express';
import FishLogController from '../../src/controllers/fishLogController';
import FishLog from '../../src/models/fishLog';

const fishLogController = new FishLogController();
const fishMock = {
  _id: '3472417428',
  userId: '61323c37dc4d0100225782f8',
  specie: 'aa',
  reviewed: false,
};
const newFishMock = {
  _id: '3472417428',
  userId: '61323c37dc4d0100225782f8',
  specie: 'bb',
  updatedBy: '61323c37dc4d0100225782f8',
};
const mockResponse = () => {
  const response = {} as Response;
  response.status = jest.fn().mockReturnValue(response);
  response.sendStatus = jest.fn().mockReturnValue(response);
  response.json = jest.fn().mockReturnValue(response);
  return response;
};

describe('Test Create FishLog function', () => {
  it('should get a statusCode 200', async () => {
    const mockRequest = {} as Request;
    mockRequest.body = {
      userId: '1',
      specie: 'aa',
    };

    const response = mockResponse();
    jest
      .spyOn(FishLog, 'create')
      .mockImplementationOnce(() => Promise.resolve({ id: 1 }));
    const res = await fishLogController.createFishLog(mockRequest, response);
    expect(res.status).toHaveBeenCalledWith(200);
  });

  // it('should get a statusCode 409 if provided used email', async () => {
  //   const mockRequest = {} as Request;
  //   mockRequest.body = {
  //     email: 'natan@gmail.com',
  //     password: '123',
  //     name: 'Jerson',
  //     state: 'Goias',
  //     city: 'Rio Verde',
  //     admin: true,
  //   };

  //   const response = mockResponse();
  //   FishLog.findOne = jest.fn().mockImplementationOnce(() => ({
  //     select: jest.fn().mockResolvedValueOnce(userMock),
  //   }));
  //   const res = await fishLogController.createFishLog(mockRequest, response);
  //   expect(res.status).toHaveBeenCalledWith(409);
  // });

  // it('should get a statusCode 409 if provided used phone', async () => {
  //   const mockRequest = {} as Request;
  //   mockRequest.body = {
  //     phone: '45645434',
  //     password: '123',
  //     name: 'Jerson',
  //     state: 'Goias',
  //     city: 'Rio Verde',
  //     admin: true,
  //   };

  //   const response = mockResponse();
  //   FishLog.findOne = jest.fn().mockImplementationOnce(() => ({
  //     select: jest.fn().mockResolvedValueOnce(userMock),
  //   }));
  //   const res = await fishLogController.createFishLog(mockRequest, response);
  //   expect(res.status).toHaveBeenCalledWith(409);
  // });

  // it('should get a statusCode 400', async () => {
  //   const mockRequest = {} as Request;
  //   mockRequest.body = {
  //     email: 'natan@gmail.com',
  //     password: '123',
  //     phone: '56565777',
  //     name: 'Jerson',
  //     state: 'Goias',
  //     city: 'Rio Verde',
  //     admin: true,
  //   };

  //   const response = mockResponse();
  //   jest
  //     .spyOn(FishLog, 'create')
  //     .mockImplementationOnce(() =>
  //       Promise.reject(Error('Usuário já existente!'))
  //     );
  //   const res = await fishLogController.createFishLog(mockRequest, response);
  //   expect(res.status).toHaveBeenCalledWith(400);
  // });
});

describe('Test Get All FishLogs function', () => {
  it('should get a statusCode 200 with admin request', async () => {
    const mockRequest = {} as Request;
    mockRequest.headers = {
      authorization:
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxMzIzYmJhZGM0ZDAxMDAyMjU3ODJmMCIsImVtYWlsIjoibmF0YW5AZ21haWwuY29tIiwicGFzc3dvcmQiOiIkMmEkMTAkWDZtZ0cwZ0JhQzAwMHhHV1pIbVJrdTdVZkpZbHNxMS9La1hRMDBtdVdtLzdhdlhoanZ4UjIiLCJhZG1pbiI6dHJ1ZSwiaWF0IjoxNjMwNjk4Mjg0LCJleHAiOjE2MzA3ODQ2ODR9.uDsTpUWS-R47UquW044GjSdDXR1bgSw5GU7WGM6IIuI',
    };
    const response = mockResponse();
    FishLog.find = jest.fn().mockResolvedValueOnce([fishMock]);
    const res = await fishLogController.getAllFishLogs(mockRequest, response);
    expect(res.status).toHaveBeenCalledWith(200);
  });

  it('should get a statusCode 200 with user request', async () => {
    const mockRequest = {} as Request;
    mockRequest.headers = {
      authorization:
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxMzIzYzM3ZGM0ZDAxMDAyMjU3ODJmOCIsImVtYWlsIjoibmF0YW5lZUBnbWFpbC5jb20iLCJwYXNzd29yZCI6IiQyYSQxMCRpQldyTk1yd3RKZEliOG5ibGZJZkVlY0cucjY0dFR3SkltRFhkQW9HYkc3b3M2UzUvUzNNNiIsImFkbWluIjpmYWxzZSwiaWF0IjoxNjMwNjk4MTAzLCJleHAiOjE2MzA3ODQ1MDN9.B4nEuDFmC4TRMY57nIWyg46loniEAzjn7PJAapwAuXc',
    };
    const response = mockResponse();
    FishLog.find = jest.fn().mockResolvedValueOnce([fishMock]);
    const res = await fishLogController.getAllFishLogs(mockRequest, response);
    expect(res.status).toHaveBeenCalledWith(200);
  });

  // it('should get a statusCode 500', async () => {
  //   const response = mockResponse();
  //   FishLog.find = jest
  //     .fn()
  //     .mockImplementationOnce(() =>
  //       Promise.reject(Error('Falha na requisição!'))
  //     );
  //   const res = await fishLogController.getAllFishLogs(response);
  //   expect(res.status).toHaveBeenCalledWith(500);
  // });
});

describe('Test Get One FishLog function', () => {
  it('should get a statusCode 200 with admin request', async () => {
    const mockRequest = {} as Request;
    mockRequest.headers = {
      authorization:
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxMzIzYmJhZGM0ZDAxMDAyMjU3ODJmMCIsImVtYWlsIjoibmF0YW5AZ21haWwuY29tIiwicGFzc3dvcmQiOiIkMmEkMTAkWDZtZ0cwZ0JhQzAwMHhHV1pIbVJrdTdVZkpZbHNxMS9La1hRMDBtdVdtLzdhdlhoanZ4UjIiLCJhZG1pbiI6dHJ1ZSwiaWF0IjoxNjMwNjk4Mjg0LCJleHAiOjE2MzA3ODQ2ODR9.uDsTpUWS-R47UquW044GjSdDXR1bgSw5GU7WGM6IIuI',
    };
    mockRequest.params = {
      id: '3472417428',
    };
    const response = mockResponse();
    FishLog.findById = jest.fn().mockResolvedValueOnce(fishMock);
    const res = await fishLogController.getOneFishLog(mockRequest, response);
    expect(res.status).toHaveBeenCalledWith(200);
  });

  it('should get a statusCode 200 with author request', async () => {
    const mockRequest = {} as Request;
    mockRequest.headers = {
      authorization:
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxMzIzYzM3ZGM0ZDAxMDAyMjU3ODJmOCIsImVtYWlsIjoibmF0YW5lZUBnbWFpbC5jb20iLCJwYXNzd29yZCI6IiQyYSQxMCRpQldyTk1yd3RKZEliOG5ibGZJZkVlY0cucjY0dFR3SkltRFhkQW9HYkc3b3M2UzUvUzNNNiIsImFkbWluIjpmYWxzZSwiaWF0IjoxNjMwNjk4MTAzLCJleHAiOjE2MzA3ODQ1MDN9.B4nEuDFmC4TRMY57nIWyg46loniEAzjn7PJAapwAuXc',
    };
    mockRequest.params = {
      id: '3472417428',
    };
    const response = mockResponse();
    FishLog.findById = jest.fn().mockResolvedValueOnce(fishMock);
    const res = await fishLogController.getOneFishLog(mockRequest, response);
    expect(res.status).toHaveBeenCalledWith(200);
  });
});

describe('Test delete FishLog function', () => {
  it('should get a statusCode 200 with admin request', async () => {
    const mockRequest = {} as Request;
    mockRequest.headers = {
      authorization:
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxMzIzYmJhZGM0ZDAxMDAyMjU3ODJmMCIsImVtYWlsIjoibmF0YW5AZ21haWwuY29tIiwicGFzc3dvcmQiOiIkMmEkMTAkWDZtZ0cwZ0JhQzAwMHhHV1pIbVJrdTdVZkpZbHNxMS9La1hRMDBtdVdtLzdhdlhoanZ4UjIiLCJhZG1pbiI6dHJ1ZSwiaWF0IjoxNjMwNjk4Mjg0LCJleHAiOjE2MzA3ODQ2ODR9.uDsTpUWS-R47UquW044GjSdDXR1bgSw5GU7WGM6IIuI',
    };
    mockRequest.params = {
      id: '3472417428',
    };
    const response = mockResponse();
    FishLog.findById = jest.fn().mockResolvedValueOnce(fishMock);
    FishLog.findByIdAndDelete = jest.fn().mockResolvedValueOnce({});
    const res = await fishLogController.deleteFishLog(mockRequest, response);
    expect(res.status).toHaveBeenCalledWith(200);
  });
});

// describe('Test Login function', () => {
//     it('should get a statusCode 200', async () => {
//       const mockRequest = {} as Request;
//       mockRequest.body = {
//         emailPhone: 'batista@sugardaddy.com',
//         password: '12345678',
//       };

//       const response = mockResponse();
//       User.findOne = jest.fn().mockImplementationOnce(() => ({
//         select: jest.fn().mockResolvedValueOnce(userMock),
//       }));
//       jest.spyOn(bcrypt, 'compare').mockImplementationOnce(() => true);
//       jest
//         .spyOn(AuthUser.prototype, 'generateToken')
//         .mockImplementationOnce(() => 'mockToken');
//       const res = await userController.login(mockRequest, response);
//       expect(res.status).toHaveBeenCalledWith(200);
//     });

//     it('should get a statusCode 401', async () => {
//       const mockRequest = {} as Request;
//       mockRequest.body = {
//         emailPhone: 'batista@sugardaddy.com',
//         password: '12345678',
//       };

//       const response = mockResponse();
//       User.findOne = jest.fn().mockImplementationOnce(() => ({
//         select: jest.fn().mockResolvedValueOnce(userMock),
//       }));
//       jest.spyOn(bcrypt, 'compare').mockImplementationOnce(() => false);
//       const res = await userController.login(mockRequest, response);
//       expect(res.status).toHaveBeenCalledWith(401);
//     });

//     it('should get a statusCode 500', async () => {
//       const mockRequest = {} as Request;
//       mockRequest.body = {
//         emailPhone: 'batista@sugardaddy.com',
//         password: '12345678',
//       };

//       const response = mockResponse();
//       User.findOne = jest.fn();
//       const res = await userController.login(mockRequest, response);
//       expect(res.status).toHaveBeenCalledWith(500);
//     });
//   });
