// изменить мб кнопки статуса по клику ?? + фиксануть вид ????


import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';


const SECRET_PASSWORD = '123'; // обновтиь на норм безопасность!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
const STATUS_OPTIONS = {

  Pending: { label: 'Очікує', color: 'bg-yellow-100 text-yellow-800 border-yellow-300' },
  Called: { label: 'Передзвонили', color: 'bg-green-100 text-green-800 border-green-300' },
};
const statusKeys = Object.keys(STATUS_OPTIONS);

const AdminAuth = ({ onLogin }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === SECRET_PASSWORD) onLogin();
    else {
      setError('Невірний пароль. Спробуйте ще раз.');
      setPassword('');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-50 to-blue-50 p-6 text-center">
      <div className="space-y-6 max-w-sm w-full bg-white p-8 rounded-xl shadow-2xl">
        <div className="space-y-3">
          <h1 className="text-3xl font-bold text-blue-600">Вхід до Admin Panel</h1>
          <p className="text-muted-foreground text-gray-500">Введіть пароль для доступу.</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            type="password"
            placeholder="Пароль"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setError('');
            }}
            className="w-full"
          />
          {error && <p className="text-sm text-red-500">{error}</p>}
          <Button type="submit" className="w-full">Увійти</Button>
        </form>
      </div>
    </div>
  );
};

const AdminDashboard = ({ data, handleStatusChange, searchQuery, handleSearchChange, isLoading, fetchAppointments }) => {
  const filteredData = data.filter(
    (record) =>
      record.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      record.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      record.servant?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      record.date?.toLowerCase().includes(searchQuery.toLowerCase()) 
  );

  const counts = {
    total: data.length,
    Called: data.filter((r) => r.status === 'Called').length,
    Pending: data.filter((r) => r.status === 'Pending').length,

  };

  const countCardStyles = {
    total: 'bg-gray-100 border-gray-300 text-gray-700',
    Called: 'bg-green-50 border-green-300 text-green-700',
    Pending: 'bg-yellow-50 border-yellow-300 text-yellow-700',
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 border-b pb-2">Панель адміністратора</h1>
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold text-blue-600 mb-4">Управління записами</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className={`p-4 rounded-lg border text-center ${countCardStyles.total}`}>
            <p className="text-xl font-bold">{counts.total}</p>
            <p className="text-sm">Усього записів</p>
          </div>
          <div className={`p-4 rounded-lg border text-center ${countCardStyles.Called}`}>
            <p className="text-xl font-bold">{counts.Called}</p>
            <p className="text-sm">Передзвонили</p>
          </div>
          <div className={`p-4 rounded-lg border text-center ${countCardStyles.Pending}`}>
            <p className="text-xl font-bold">{counts.Pending}</p>
            <p className="text-sm">Очікує</p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-between items-center mb-6">
          <Input
            placeholder="Пошук за іменем або email..."
            className="w-full sm:max-w-sm"
            value={searchQuery}
            onChange={handleSearchChange}
          />
          <div className="flex gap-4 bg-green-50 border-green-300 text-green-800">
            <Button onClick={fetchAppointments} disabled={isLoading} variant="outline" className="transition-all duration-300">
              {isLoading ? 'Оновлення...' : 'Оновити дані'}
            </Button>
            
          </div>
        </div>

        {isLoading ? (
          <div className="text-center py-10 text-lg text-blue-500">Завантаження записів з бази даних...</div>
        ) : (
          <div className="overflow-x-auto border rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-blue-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ім'я</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Номер телефону</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Бажана послуга</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Бажана дата та час</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Дата створення</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-40">Статус дзвінка</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredData.length > 0 ? (
                  filteredData.map((record) => {
                    const currentStatus = STATUS_OPTIONS[record.status] || STATUS_OPTIONS.Pending;
                    return (
                      <tr key={record.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{record.id}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{record.name}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{record.email}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{record.phone}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{record.servant}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{record.dateDay}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{record.date}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <select
                            value={record.status}
                            onChange={(e) => handleStatusChange(record.id, e.target.value)}
                            className={`py-1 px-2 rounded-md border text-xs font-medium cursor-pointer appearance-none focus:outline-none focus:ring-2 ${currentStatus.color}`}
                            style={{ minWidth: '120px' }}
                          >
                            {statusKeys.map((key) => (
                              <option key={key} value={key}>
                                {STATUS_OPTIONS[key].label}
                              </option>
                            ))}
                          </select>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan={5} className="px-6 py-10 text-center text-gray-500">
                      {searchQuery ? 'Записів не знайдено за вашим запитом.' : 'Дані відсутні.'}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};


export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchAppointments = async () => {
    if (isLoading) return;
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch('http://localhost:5000/api/appointment');
      if (!response.ok) throw new Error(`Помилка завантаження даних: ${response.status} ${response.statusText}`);
      const apiData = await response.json();
      setData(apiData);
    } catch (err) {
      console.error(err);
      setError('Не вдалося завантажити дані з сервера. Спробуйте пізніше.');
      setData([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) fetchAppointments();
  }, [isAuthenticated]);

  const handleStatusChange = async (id, newStatus) => {
    try {
    setData((prevData) =>
      prevData.map((record) => (record.id === id ? { ...record, status: newStatus } : record))
    );
    const response = await fetch(`http://localhost:5000/api/appointment/${id}/status`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({status: newStatus}),
    });

    if (!response.ok) throw new Error("Невдалось оновити данні")

      const updated = await response.json();
      console.log("Updated in DB:", updated);
    } catch (err) {
      console.error(error);
    }
  };

  const handleSearchChange = (e) => setSearchQuery(e.target.value);
  const handleLogin = () => setIsAuthenticated(true);

  if (!isAuthenticated) return <AdminAuth onLogin={handleLogin} />;
  if (error && !isLoading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-red-50 p-6">
        <div className="bg-white p-6 rounded-lg shadow-xl border border-red-300">
          <h2 className="text-xl font-bold text-red-600 mb-2">Помилка з'єднання</h2>
          <p className="text-gray-700">{error}</p>
          <Button onClick={fetchAppointments} className="mt-4">Спробувати оновити дані</Button>
        </div>
      </div>
    );

  return (
    <AdminDashboard
      data={data}
      handleStatusChange={handleStatusChange}
      searchQuery={searchQuery}
      handleSearchChange={handleSearchChange}
      isLoading={isLoading}
      fetchAppointments={fetchAppointments}
    />
  );
}
