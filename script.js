// script.js - JavaScript cho trang đăng nhập An Khang & Phương Thảo

// Tạo trái tim bay
function createFloatingHearts() {
    const container = document.getElementById('floatingHearts');
    const heartCount = 15;

    for (let i = 0; i < heartCount; i++) {
        const heart = document.createElement('div');
        heart.className = 'floating-heart';
        heart.innerHTML = '❤';
        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.top = Math.random() * 100 + 'vh';
        heart.style.fontSize = (Math.random() * 20 + 10) + 'px';
        heart.style.animationDelay = Math.random() * 5 + 's';
        heart.style.opacity = Math.random() * 0.5 + 0.3;
        container.appendChild(heart);
    }
}

// Tạo sao lấp lánh
function createStars() {
    const container = document.getElementById('stars');
    const starCount = 80;

    for (let i = 0; i < starCount; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        star.style.left = Math.random() * 100 + 'vw';
        star.style.top = Math.random() * 100 + 'vh';
        star.style.width = Math.random() * 3 + 1 + 'px';
        star.style.height = star.style.width;
        star.style.animationDelay = Math.random() * 5 + 's';
        container.appendChild(star);
    }
}

// Hiển thị/ẩn mật khẩu
function setupPasswordToggle() {
    const passwordToggle = document.getElementById('passwordToggle');
    const passwordInput = document.getElementById('password');

    passwordToggle.addEventListener('click', function() {
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);
        this.innerHTML = type === 'password' ? '<i class="fas fa-eye"></i>' : '<i class="fas fa-eye-slash"></i>';
    });
}

// Thông tin đăng nhập hợp lệ
const validCredentials = [
    { username: 'An Khang', password: 'PhuongThao' },
    { username: 'Phương Thảo', password: 'AnKhang' },
    { username: 'ankhang', password: 'phuongthao' },
    { username: 'phuongthao', password: 'ankhang' },
    { username: 'AnKhang', password: 'PhuongThao' },
    { username: 'PhuongThao', password: 'AnKhang' }
];

// Xử lý đăng nhập
function setupLoginForm() {
    const loginForm = document.getElementById('loginForm');
    const errorMessage = document.getElementById('errorMessage');
    const successMessage = document.getElementById('successMessage');

    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const username = document.getElementById('username').value.trim();
        const password = document.getElementById('password').value;

        // Kiểm tra thông tin đăng nhập
        const isValid = validCredentials.some(cred => 
            cred.username.toLowerCase() === username.toLowerCase() && 
            cred.password === password
        );

        if (isValid) {
            // Hiển thị thông báo thành công
            errorMessage.style.display = 'none';
            successMessage.style.display = 'block';

            // Lưu thông tin đăng nhập nếu người dùng chọn "Ghi nhớ"
            if (document.getElementById('remember').checked) {
                localStorage.setItem('rememberedUser', username);
            } else {
                localStorage.removeItem('rememberedUser');
            }

            // Chuyển hướng sau 2 giây
            setTimeout(() => {
                // Thay đổi URL này để trỏ đến trang chính của bạn
                window.location.href = 'countdown.html'; // Đổi thành trang chính của bạn
            }, 2000);
        } else {
            // Hiển thị thông báo lỗi
            successMessage.style.display = 'none';
            errorMessage.style.display = 'block';

            // Hiệu ứng lắc form
            loginForm.style.animation = 'shake 0.5s';
            setTimeout(() => {
                loginForm.style.animation = '';
            }, 500);
        }
    });
}

// Kiểm tra nếu có thông tin đăng nhập đã lưu
function checkRememberedUser() {
    const rememberedUser = localStorage.getItem('rememberedUser');
    if (rememberedUser) {
        document.getElementById('username').value = rememberedUser;
        document.getElementById('remember').checked = true;
    }
}

// Xử lý đăng ký
function setupRegisterLink() {
    document.getElementById('registerLink').addEventListener('click', function(e) {
        e.preventDefault();
        alert('Tính năng đăng ký sẽ sớm được cập nhật! Hiện tại, vui lòng sử dụng tài khoản đã được cung cấp.');
    });
}

// Xử lý quên mật khẩu
function setupForgotPassword() {
    document.querySelector('.forgot').addEventListener('click', function(e) {
        e.preventDefault();
        alert('Gợi ý: Mật khẩu là tên của người còn lại (viết liền không dấu). Ví dụ: AnKhang hoặc PhuongThao');
    });
}

// Khởi tạo khi trang tải xong
function init() {
    createFloatingHearts();
    createStars();
    setupPasswordToggle();
    setupLoginForm();
    checkRememberedUser();
    setupRegisterLink();
    setupForgotPassword();

    // Thêm CSS cho hiệu ứng lắc nếu chưa có
    if (!document.querySelector('#shake-animation')) {
        const style = document.createElement('style');
        style.id = 'shake-animation';
        style.textContent = `
            @keyframes shake {
                0%, 100% { transform: translateX(0); }
                10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
                20%, 40%, 60%, 80% { transform: translateX(5px); }
            }
        `;
        document.head.appendChild(style);
    }
}

// Chạy khi DOM đã tải xong
document.addEventListener('DOMContentLoaded', init);