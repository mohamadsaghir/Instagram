  document.getElementById('loginBtn').addEventListener('click', async () => {
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();

    if (!username || !password) {
      alert('يرجى إدخال اسم المستخدم وكلمة المرور');
      return;
    }

    try {
      const res = await fetch('/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });

      const data = await res.json();

      if (res.ok) {
        alert(data.message);
        // لو حابب تفتح صفحة المستخدمين بعد تسجيل الدخول:
        // window.location.href = '/users.html';
      } else {
        alert('حدث خطأ: ' + (data.error || 'فشل تسجيل الدخول'));
      }
    } catch (error) {
      alert('حدث خطأ في الاتصال بالسيرفر');
      console.error(error);
    }
  });