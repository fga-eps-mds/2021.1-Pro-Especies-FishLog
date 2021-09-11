import { Response, Request } from 'express';
// import bcrypt from 'bcryptjs';
// import Auth from '../../src/middleware/auth';
import FishLogController from '../../src/controllers/fishLogController';
import FishLog from '../../src/models/fishLog';

const fishLogController = new FishLogController();
const userMock = {
  _id: '3472417428',
  email: 'natan@gmail.com',
  password: '123',
  phone: '56565777',
  name: 'Jerson',
  state: 'Goias',
  city: 'Rio Verde',
  admin: true,
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
      email: 'natan@gmail.com',
      password: '123',
      phone: '56565777',
      name: 'Jerson',
      state: 'Goias',
      city: 'Rio Verde',
      admin: true,
    };

    const response = mockResponse();
    jest
      .spyOn(FishLog, 'create')
      .mockImplementationOnce(() => Promise.resolve({ id: 1 }));
    const res = await fishLogController.createFishLog(mockRequest, response);
    expect(res.status).toHaveBeenCalledWith(200);
  });

  it('should get a statusCode 409 if provided used email', async () => {
    const mockRequest = {} as Request;
    mockRequest.body = {
      email: 'natan@gmail.com',
      password: '123',
      name: 'Jerson',
      state: 'Goias',
      city: 'Rio Verde',
      admin: true,
    };

    const response = mockResponse();
    FishLog.findOne = jest.fn().mockImplementationOnce(() => ({
      select: jest.fn().mockResolvedValueOnce(userMock),
    }));
    const res = await fishLogController.createFishLog(mockRequest, response);
    expect(res.status).toHaveBeenCalledWith(409);
  });

  it('should get a statusCode 409 if provided used phone', async () => {
    const mockRequest = {} as Request;
    mockRequest.body = {
      phone: '45645434',
      password: '123',
      name: 'Jerson',
      state: 'Goias',
      city: 'Rio Verde',
      admin: true,
    };

    const response = mockResponse();
    FishLog.findOne = jest.fn().mockImplementationOnce(() => ({
      select: jest.fn().mockResolvedValueOnce(userMock),
    }));
    const res = await fishLogController.createFishLog(mockRequest, response);
    expect(res.status).toHaveBeenCalledWith(409);
  });

  it('should get a statusCode 400', async () => {
    const mockRequest = {} as Request;
    mockRequest.body = {
      email: 'natan@gmail.com',
      password: '123',
      phone: '56565777',
      name: 'Jerson',
      state: 'Goias',
      city: 'Rio Verde',
      admin: true,
    };

    const response = mockResponse();
    jest
      .spyOn(FishLog, 'create')
      .mockImplementationOnce(() =>
        Promise.reject(Error('Usuário já existente!'))
      );
    const res = await fishLogController.createFishLog(mockRequest, response);
    expect(res.status).toHaveBeenCalledWith(400);
  });
});

describe('Test Get All FishLogs function', () => {
  it('should get a statusCode 200', async () => {
    const response = mockResponse();
    FishLog.find = jest.fn().mockResolvedValueOnce([userMock]);
    const res = await fishLogController.getAllFishLogs(response);
    expect(res.status).toHaveBeenCalledWith(200);
  });

  it('should get a statusCode 500', async () => {
    const response = mockResponse();
    FishLog.find = jest
      .fn()
      .mockImplementationOnce(() =>
        Promise.reject(Error('Falha na requisição!'))
      );
    const res = await fishLogController.getAllFishLogs(response);
    expect(res.status).toHaveBeenCalledWith(500);
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
