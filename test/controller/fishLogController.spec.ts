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
const mockResponse = () => {
  const response = {} as Response;
  response.status = jest.fn().mockReturnValue(response);
  response.sendStatus = jest.fn().mockReturnValue(response);
  response.json = jest.fn().mockReturnValue(response);
  return response;
};

describe('Test Create FishLog function', () => {
  it('should get a statusCode 200 providing species', async () => {
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

  it('should get a statusCode 400', async () => {
    const mockRequest = {} as Request;
    mockRequest.body = {
      userId: '1',
    };

    const response = mockResponse();
    jest
      .spyOn(FishLog, 'create')
      .mockImplementationOnce(() => Promise.resolve({ id: 1 }));
    const res = await fishLogController.createFishLog(mockRequest, response);
    expect(res.status).toHaveBeenCalledWith(400);
  });

  it('should get a statusCode 500', async () => {
    const mockRequest = {} as Request;

    const response = mockResponse();
    jest
      .spyOn(FishLog, 'create')
      .mockImplementationOnce(() =>
        Promise.reject(Error('Falha no sistema de criação de registro'))
      );
    const res = await fishLogController.createFishLog(mockRequest, response);
    expect(res.status).toHaveBeenCalledWith(500);
  });
});

describe('Test Get All FishLogs function', () => {
  it('should get a statusCode 200 with admin request and get all fishlogs', async () => {
    const mockRequest = {} as Request;
    mockRequest.query = {
      status: 'all',
    };
    mockRequest.headers = {
      authorization:
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxMzIzYmJhZGM0ZDAxMDAyMjU3ODJmMCIsImVtYWlsIjoibmF0YW5AZ21haWwuY29tIiwicGFzc3dvcmQiOiIkMmEkMTAkWDZtZ0cwZ0JhQzAwMHhHV1pIbVJrdTdVZkpZbHNxMS9La1hRMDBtdVdtLzdhdlhoanZ4UjIiLCJhZG1pbiI6dHJ1ZSwiaWF0IjoxNjMwNjk4Mjg0LCJleHAiOjE2MzA3ODQ2ODR9.uDsTpUWS-R47UquW044GjSdDXR1bgSw5GU7WGM6IIuI',
    };
    const response = mockResponse();
    FishLog.find = jest.fn().mockResolvedValueOnce([fishMock]);
    const res = await fishLogController.getAllFishLogs(mockRequest, response);
    expect(res.status).toHaveBeenCalledWith(200);
  });

  it('should get a statusCode 200 with admin request and get reviewed fishlogs', async () => {
    const mockRequest = {} as Request;
    mockRequest.query = {
      status: 'reviewed',
    };
    mockRequest.headers = {
      authorization:
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxMzIzYmJhZGM0ZDAxMDAyMjU3ODJmMCIsImVtYWlsIjoibmF0YW5AZ21haWwuY29tIiwicGFzc3dvcmQiOiIkMmEkMTAkWDZtZ0cwZ0JhQzAwMHhHV1pIbVJrdTdVZkpZbHNxMS9La1hRMDBtdVdtLzdhdlhoanZ4UjIiLCJhZG1pbiI6dHJ1ZSwiaWF0IjoxNjMwNjk4Mjg0LCJleHAiOjE2MzA3ODQ2ODR9.uDsTpUWS-R47UquW044GjSdDXR1bgSw5GU7WGM6IIuI',
    };
    const response = mockResponse();
    FishLog.find = jest.fn().mockResolvedValueOnce([fishMock]);
    const res = await fishLogController.getAllFishLogs(mockRequest, response);
    expect(res.status).toHaveBeenCalledWith(200);
  });

  it('should get a statusCode 200 with admin request and get to be reviewed fishlogs', async () => {
    const mockRequest = {} as Request;
    mockRequest.query = {
      status: 'toBeReviewed',
    };
    mockRequest.headers = {
      authorization:
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxMzIzYmJhZGM0ZDAxMDAyMjU3ODJmMCIsImVtYWlsIjoibmF0YW5AZ21haWwuY29tIiwicGFzc3dvcmQiOiIkMmEkMTAkWDZtZ0cwZ0JhQzAwMHhHV1pIbVJrdTdVZkpZbHNxMS9La1hRMDBtdVdtLzdhdlhoanZ4UjIiLCJhZG1pbiI6dHJ1ZSwiaWF0IjoxNjMwNjk4Mjg0LCJleHAiOjE2MzA3ODQ2ODR9.uDsTpUWS-R47UquW044GjSdDXR1bgSw5GU7WGM6IIuI',
    };
    const response = mockResponse();
    FishLog.find = jest.fn().mockResolvedValueOnce([fishMock]);
    const res = await fishLogController.getAllFishLogs(mockRequest, response);
    expect(res.status).toHaveBeenCalledWith(200);
  });

  it('should get a statusCode 200 with user request and get all fishlogs', async () => {
    const mockRequest = {} as Request;
    mockRequest.query = {
      status: 'all',
    };
    mockRequest.headers = {
      authorization:
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxMzIzYzM3ZGM0ZDAxMDAyMjU3ODJmOCIsImVtYWlsIjoibmF0YW5lZUBnbWFpbC5jb20iLCJwYXNzd29yZCI6IiQyYSQxMCRpQldyTk1yd3RKZEliOG5ibGZJZkVlY0cucjY0dFR3SkltRFhkQW9HYkc3b3M2UzUvUzNNNiIsImFkbWluIjpmYWxzZSwiaWF0IjoxNjMwNjk4MTAzLCJleHAiOjE2MzA3ODQ1MDN9.B4nEuDFmC4TRMY57nIWyg46loniEAzjn7PJAapwAuXc',
    };
    const response = mockResponse();
    FishLog.find = jest.fn().mockResolvedValueOnce([fishMock]);
    const res = await fishLogController.getAllFishLogs(mockRequest, response);
    expect(res.status).toHaveBeenCalledWith(200);
  });

  it('should get a statusCode 200 with user request and get reviewed fishlogs', async () => {
    const mockRequest = {} as Request;
    mockRequest.query = {
      status: 'reviewed',
    };
    mockRequest.headers = {
      authorization:
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxMzIzYzM3ZGM0ZDAxMDAyMjU3ODJmOCIsImVtYWlsIjoibmF0YW5lZUBnbWFpbC5jb20iLCJwYXNzd29yZCI6IiQyYSQxMCRpQldyTk1yd3RKZEliOG5ibGZJZkVlY0cucjY0dFR3SkltRFhkQW9HYkc3b3M2UzUvUzNNNiIsImFkbWluIjpmYWxzZSwiaWF0IjoxNjMwNjk4MTAzLCJleHAiOjE2MzA3ODQ1MDN9.B4nEuDFmC4TRMY57nIWyg46loniEAzjn7PJAapwAuXc',
    };
    const response = mockResponse();
    FishLog.find = jest.fn().mockResolvedValueOnce([fishMock]);
    const res = await fishLogController.getAllFishLogs(mockRequest, response);
    expect(res.status).toHaveBeenCalledWith(200);
  });

  it('should get a statusCode 200 with user request and get to be reviewed fishlogs', async () => {
    const mockRequest = {} as Request;
    mockRequest.query = {
      status: 'toBeReviewed',
    };
    mockRequest.headers = {
      authorization:
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxMzIzYzM3ZGM0ZDAxMDAyMjU3ODJmOCIsImVtYWlsIjoibmF0YW5lZUBnbWFpbC5jb20iLCJwYXNzd29yZCI6IiQyYSQxMCRpQldyTk1yd3RKZEliOG5ibGZJZkVlY0cucjY0dFR3SkltRFhkQW9HYkc3b3M2UzUvUzNNNiIsImFkbWluIjpmYWxzZSwiaWF0IjoxNjMwNjk4MTAzLCJleHAiOjE2MzA3ODQ1MDN9.B4nEuDFmC4TRMY57nIWyg46loniEAzjn7PJAapwAuXc',
    };
    const response = mockResponse();
    FishLog.find = jest.fn().mockResolvedValueOnce([fishMock]);
    const res = await fishLogController.getAllFishLogs(mockRequest, response);
    expect(res.status).toHaveBeenCalledWith(200);
  });

  it('should get a statusCode 404 with user request and incorrect query', async () => {
    const mockRequest = {} as Request;
    mockRequest.query = {
      status: 'abc',
    };
    mockRequest.headers = {
      authorization:
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxMzIzYzM3ZGM0ZDAxMDAyMjU3ODJmOCIsImVtYWlsIjoibmF0YW5lZUBnbWFpbC5jb20iLCJwYXNzd29yZCI6IiQyYSQxMCRpQldyTk1yd3RKZEliOG5ibGZJZkVlY0cucjY0dFR3SkltRFhkQW9HYkc3b3M2UzUvUzNNNiIsImFkbWluIjpmYWxzZSwiaWF0IjoxNjMwNjk4MTAzLCJleHAiOjE2MzA3ODQ1MDN9.B4nEuDFmC4TRMY57nIWyg46loniEAzjn7PJAapwAuXc',
    };
    const response = mockResponse();
    FishLog.find = jest.fn().mockResolvedValueOnce([fishMock]);
    const res = await fishLogController.getAllFishLogs(mockRequest, response);
    expect(res.status).toHaveBeenCalledWith(404);
  });

  it('should get a statusCode 500 if request failed', async () => {
    const mockRequest = {} as Request;
    mockRequest.headers = {
      authorization:
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxMzIzYzM3ZGM0ZDAxMDAyMjU3ODJmOCIsImVtYWlsIjoibmF0YW5lZUBnbWFpbC5jb20iLCJwYXNzd29yZCI6IiQyYSQxMCRpQldyTk1yd3RKZEliOG5ibGZJZkVlY0cucjY0dFR3SkltRFhkQW9HYkc3b3M2UzUvUzNNNiIsImFkbWluIjpmYWxzZSwiaWF0IjoxNjMwNjk4MTAzLCJleHAiOjE2MzA3ODQ1MDN9.B4nEuDFmC4TRMY57nIWyg46loniEAzjn7PJAapwAuXc',
    };
    const response = mockResponse();
    FishLog.find = jest
      .fn()
      .mockImplementationOnce(() =>
        Promise.reject(Error('Falha na requisição!'))
      );
    const res = await fishLogController.getAllFishLogs(mockRequest, response);
    expect(res.status).toHaveBeenCalledWith(500);
  });
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

  it('should get a statusCode 404 if fishlog not found', async () => {
    const mockRequest = {} as Request;
    mockRequest.headers = {
      authorization:
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxMzIzYzM3ZGM0ZDAxMDAyMjU3ODJmOCIsImVtYWlsIjoibmF0YW5lZUBnbWFpbC5jb20iLCJwYXNzd29yZCI6IiQyYSQxMCRpQldyTk1yd3RKZEliOG5ibGZJZkVlY0cucjY0dFR3SkltRFhkQW9HYkc3b3M2UzUvUzNNNiIsImFkbWluIjpmYWxzZSwiaWF0IjoxNjMwNjk4MTAzLCJleHAiOjE2MzA3ODQ1MDN9.B4nEuDFmC4TRMY57nIWyg46loniEAzjn7PJAapwAuXc',
    };
    mockRequest.params = {
      id: '3472417428',
    };
    const response = mockResponse();
    FishLog.findById = jest.fn().mockResolvedValueOnce(undefined);
    const res = await fishLogController.getOneFishLog(mockRequest, response);
    expect(res.status).toHaveBeenCalledWith(404);
  });

  it('should get a statusCode 401 if user is not the author', async () => {
    const mockRequest = {} as Request;
    mockRequest.headers = {
      authorization:
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxMzI2NGJmMzZmMzAzMDAyMjVlYWE5YiIsImVtYWlsIjoibmF0YW5lZWRkQGdtYWlsLmNvbSIsInBhc3N3b3JkIjoiJDJhJDEwJGlaT0gwUnhaSUxHN0RlbnFXRktCRGVra0szUHBaTnU0ZXNwajl4UjFHMU1FaWh4T0h5b3l1IiwiYWRtaW4iOmZhbHNlLCJpYXQiOjE2MzA2OTgxOTgsImV4cCI6MTYzMDc4NDU5OH0._lbiE0RZJn1N3mgQuiVjsGza8FC1grjRrVDjaxCCz6w',
    };
    mockRequest.params = {
      id: '3472417428',
    };
    const response = mockResponse();
    FishLog.findById = jest.fn().mockResolvedValueOnce(fishMock);
    const res = await fishLogController.getOneFishLog(mockRequest, response);
    expect(res.status).toHaveBeenCalledWith(401);
  });

  it('should get a statusCode 500 if request failed', async () => {
    const mockRequest = {} as Request;
    const response = mockResponse();
    FishLog.findById = jest.fn().mockResolvedValueOnce(fishMock);
    const res = await fishLogController.getOneFishLog(mockRequest, response);
    expect(res.status).toHaveBeenCalledWith(500);
  });
});

describe('Test update FishLog function', () => {
  it('should get a statusCode 404 if fishlog not found', async () => {
    const mockRequest = {} as Request;
    mockRequest.body = {
      userId: '61323c37dc4d0100225782f8',
      specie: 'bb',
    };
    mockRequest.headers = {
      authorization:
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxMzIzYzM3ZGM0ZDAxMDAyMjU3ODJmOCIsImVtYWlsIjoibmF0YW5lZUBnbWFpbC5jb20iLCJwYXNzd29yZCI6IiQyYSQxMCRpQldyTk1yd3RKZEliOG5ibGZJZkVlY0cucjY0dFR3SkltRFhkQW9HYkc3b3M2UzUvUzNNNiIsImFkbWluIjpmYWxzZSwiaWF0IjoxNjMwNjk4MTAzLCJleHAiOjE2MzA3ODQ1MDN9.B4nEuDFmC4TRMY57nIWyg46loniEAzjn7PJAapwAuXc',
    };
    mockRequest.params = {
      id: '3472417428',
    };
    const response = mockResponse();
    FishLog.findById = jest.fn().mockResolvedValueOnce(undefined);
    const res = await fishLogController.updateFishLog(mockRequest, response);
    expect(res.status).toHaveBeenCalledWith(404);
  });

  it('should get a statusCode 401 if user is not the author', async () => {
    const mockRequest = {} as Request;
    mockRequest.body = {
      userId: '61323c37dc4d0100225782f8',
      specie: 'bb',
    };
    mockRequest.headers = {
      authorization:
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxMzI2NGJmMzZmMzAzMDAyMjVlYWE5YiIsImVtYWlsIjoibmF0YW5lZWRkQGdtYWlsLmNvbSIsInBhc3N3b3JkIjoiJDJhJDEwJGlaT0gwUnhaSUxHN0RlbnFXRktCRGVra0szUHBaTnU0ZXNwajl4UjFHMU1FaWh4T0h5b3l1IiwiYWRtaW4iOmZhbHNlLCJpYXQiOjE2MzA2OTgxOTgsImV4cCI6MTYzMDc4NDU5OH0._lbiE0RZJn1N3mgQuiVjsGza8FC1grjRrVDjaxCCz6w',
    };
    mockRequest.params = {
      id: '3472417428',
    };
    const response = mockResponse();
    FishLog.findById = jest.fn().mockResolvedValueOnce(fishMock);
    const res = await fishLogController.updateFishLog(mockRequest, response);
    expect(res.status).toHaveBeenCalledWith(401);
  });

  it('should get a statusCode 500 if request failed', async () => {
    const mockRequest = {} as Request;
    const response = mockResponse();
    FishLog.findById = jest.fn().mockResolvedValueOnce(fishMock);
    const res = await fishLogController.updateFishLog(mockRequest, response);
    expect(res.status).toHaveBeenCalledWith(500);
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

  it('should get a statusCode 404 if fishlog not found', async () => {
    const mockRequest = {} as Request;
    mockRequest.headers = {
      authorization:
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxMzIzYmJhZGM0ZDAxMDAyMjU3ODJmMCIsImVtYWlsIjoibmF0YW5AZ21haWwuY29tIiwicGFzc3dvcmQiOiIkMmEkMTAkWDZtZ0cwZ0JhQzAwMHhHV1pIbVJrdTdVZkpZbHNxMS9La1hRMDBtdVdtLzdhdlhoanZ4UjIiLCJhZG1pbiI6dHJ1ZSwiaWF0IjoxNjMwNjk4Mjg0LCJleHAiOjE2MzA3ODQ2ODR9.uDsTpUWS-R47UquW044GjSdDXR1bgSw5GU7WGM6IIuI',
    };
    mockRequest.params = {
      id: '3472417428',
    };
    const response = mockResponse();
    FishLog.findById = jest.fn().mockResolvedValueOnce(undefined);
    FishLog.findByIdAndDelete = jest.fn().mockResolvedValueOnce({});
    const res = await fishLogController.deleteFishLog(mockRequest, response);
    expect(res.status).toHaveBeenCalledWith(404);
  });

  it('should get a statusCode 401 if user is not the author', async () => {
    const mockRequest = {} as Request;
    mockRequest.headers = {
      authorization:
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxMzI2NGJmMzZmMzAzMDAyMjVlYWE5YiIsImVtYWlsIjoibmF0YW5lZWRkQGdtYWlsLmNvbSIsInBhc3N3b3JkIjoiJDJhJDEwJGlaT0gwUnhaSUxHN0RlbnFXRktCRGVra0szUHBaTnU0ZXNwajl4UjFHMU1FaWh4T0h5b3l1IiwiYWRtaW4iOmZhbHNlLCJpYXQiOjE2MzA2OTgxOTgsImV4cCI6MTYzMDc4NDU5OH0._lbiE0RZJn1N3mgQuiVjsGza8FC1grjRrVDjaxCCz6w',
    };
    mockRequest.params = {
      id: '3472417428',
    };
    const response = mockResponse();
    FishLog.findById = jest.fn().mockResolvedValueOnce(fishMock);
    FishLog.findByIdAndDelete = jest.fn().mockResolvedValueOnce({});
    const res = await fishLogController.deleteFishLog(mockRequest, response);
    expect(res.status).toHaveBeenCalledWith(401);
  });

  it('should get a statusCode 500 if request failed', async () => {
    const mockRequest = {} as Request;
    const response = mockResponse();
    FishLog.findById = jest.fn().mockResolvedValueOnce(fishMock);
    FishLog.findByIdAndDelete = jest.fn().mockResolvedValueOnce({});
    const res = await fishLogController.deleteFishLog(mockRequest, response);
    expect(res.status).toHaveBeenCalledWith(500);
  });
});
