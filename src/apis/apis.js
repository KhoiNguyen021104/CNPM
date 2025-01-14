import authorizedAxiosInstance from "@/utils/authorizeAxios"
import { API_ROOT } from "@/utils/constants"

// Users
export const loginAPI = async (data) => {
  return (await authorizedAxiosInstance.post(`${API_ROOT}/v1/users/login`, data)).data
}

export const registerAPI = async (user) => {
  return (await authorizedAxiosInstance.post(`${API_ROOT}/v1/users/register`, user)).data
}

export const logoutAPI = async () => {
  return (await authorizedAxiosInstance.delete(`${API_ROOT}/v1/users/logout`)).data
}

export const refreshTokenAPI = async (refreshToken) => {
  return await authorizedAxiosInstance.put(`${API_ROOT}/v1/users/refresh_token`, { refreshToken })
}

// Users

// Drivers

export const getAllDriversAPI = async () => {
  return (await authorizedAxiosInstance.get(`${API_ROOT}/v1/drivers`)).data
}

export const createDriverAPI = async (driver) => {
  return (await authorizedAxiosInstance.post(`${API_ROOT}/v1/drivers`, driver)).data
}

export const getOneDriverByIdAPI = async (driverId) => {
  return (await authorizedAxiosInstance.get(`${API_ROOT}/v1/drivers/${driverId}`)).data
}

export const updateDriverAPI = async (driverId, driver) => {
  return (await authorizedAxiosInstance.put(`${API_ROOT}/v1/drivers/${driverId}`, driver)).data
}

export const deleteDriverAPI = async (driverId) => {
  return (await authorizedAxiosInstance.delete(`${API_ROOT}/v1/drivers/${driverId}`)).data
}

// Drivers


// Vehicles

export const getAllVehiclesAPI = async () => {
  return (await authorizedAxiosInstance.get(`${API_ROOT}/v1/vehicles`)).data
}

export const createVehicleAPI = async (vehicle) => {
  return (await authorizedAxiosInstance.post(`${API_ROOT}/v1/vehicles`, vehicle)).data
}

export const getOneVehicleByIdAPI = async (vehicleId) => {
  return (await authorizedAxiosInstance.get(`${API_ROOT}/v1/vehicles/${vehicleId}`)).data
}

export const updateVehicleAPI = async (vehicleId, vehicle) => {
  return (await authorizedAxiosInstance.put(`${API_ROOT}/v1/vehicles/${vehicleId}`, vehicle)).data
}

export const deleteVehicleAPI = async (vehicleId) => {
  return (await authorizedAxiosInstance.delete(`${API_ROOT}/v1/vehicles/${vehicleId}`)).data
}

// Vehicles


// Schedules

export const getAllSchedulesAPI = async () => {
  return (await authorizedAxiosInstance.get(`${API_ROOT}/v1/schedules`)).data
}

export const createScheduleAPI = async (schedule) => {
  return (await authorizedAxiosInstance.post(`${API_ROOT}/v1/schedules`, schedule)).data
}

export const getOneScheduleByIdAPI = async (scheduleId) => {
  return (await authorizedAxiosInstance.get(`${API_ROOT}/v1/schedules/${scheduleId}`)).data
}

export const updateScheduleAPI = async (scheduleId, schedule) => {
  return (await authorizedAxiosInstance.put(`${API_ROOT}/v1/schedules/${scheduleId}`, schedule)).data
}

export const deleteScheduleAPI = async (scheduleId) => {
  return (await authorizedAxiosInstance.delete(`${API_ROOT}/v1/schedules/${scheduleId}`)).data
}

// Schedules



// Routes

export const getAllRoutesAPI = async () => {
  return (await authorizedAxiosInstance.get(`${API_ROOT}/v1/routes`)).data
}

export const createRouteAPI = async (route) => {
  return (await authorizedAxiosInstance.post(`${API_ROOT}/v1/routes`, route)).data
}

export const getOneRouteByIdAPI = async (routeId) => {
  return (await authorizedAxiosInstance.get(`${API_ROOT}/v1/routes/${routeId}`)).data
}

export const updateRouteAPI = async (routeId, route) => {
  return (await authorizedAxiosInstance.put(`${API_ROOT}/v1/routes/${routeId}`, route)).data
}

export const deleteRouteAPI = async (routeId) => {
  return (await authorizedAxiosInstance.delete(`${API_ROOT}/v1/routes/${routeId}`)).data
}

// Routes

// Routes

export const getAllBookingsAPI = async () => {
  return (await authorizedAxiosInstance.get(`${API_ROOT}/v1/bookings`)).data
}

export const createBookingAPI = async (booking) => {
  return (await authorizedAxiosInstance.post(`${API_ROOT}/v1/bookings`, booking)).data
}

export const getOneBookingByIdAPI = async (bookingId) => {
  return (await authorizedAxiosInstance.get(`${API_ROOT}/v1/bookings/${bookingId}`)).data
}

export const updateBookingAPI = async (bookingId, booking) => {
  return (await authorizedAxiosInstance.put(`${API_ROOT}/v1/bookings/${bookingId}`, booking)).data
}

export const deleteBookingAPI = async (bookingId) => {
  return (await authorizedAxiosInstance.delete(`${API_ROOT}/v1/bookings/${bookingId}`)).data
}

// Routes
