// 全局变量
let cart = [];
let peopleCount = 0;
let isDragging = false;

// 全局变量
let isLoggedIn = false;
let userData = {};

// 从localStorage加载用户数据
function loadUserData() {
    const storedUsers = localStorage.getItem('users');
    return storedUsers ? JSON.parse(storedUsers) : [];
}

// 保存用户数据到localStorage
function saveUserData(users) {
    localStorage.setItem('users', JSON.stringify(users));
}

// 获取所有用户数据
function getAllUsers() {
    return loadUserData();
}

// 添加新用户
function addUser(user) {
    const users = loadUserData();
    users.push(user);
    saveUserData(users);
}

// 根据用户名查找用户
function findUser(username) {
    const users = loadUserData();
    return users.find(user => user.username === username);
}

// DOM元素
const peopleModal = document.getElementById('peopleModal');
const dialBtns = document.querySelectorAll('.dial-btn');
const peopleCountEl = document.getElementById('peopleCount');
const confirmPeopleBtn = document.getElementById('confirmPeople');
const skipPeopleBtn = document.getElementById('skipPeople');
const orderPage = document.getElementById('orderPage');
const searchPage = document.getElementById('searchPage');
const profilePage = document.getElementById('profilePage');
const navBtns = document.querySelectorAll('.nav-btn');
const categoryItems = document.querySelectorAll('.category-item');
const categorySlider = document.querySelector('.category-slider');
const foodList = document.querySelector('.food-list');
const categorySections = document.querySelectorAll('.category-section');
const addBtns = document.querySelectorAll('.add-btn');
const cartBtn = document.getElementById('cartBtn');
const cartCountEl = document.getElementById('cartCount');
const cartModal = document.getElementById('cartModal');
const cartItemsEl = document.getElementById('cartItems');
const cartTotalEl = document.getElementById('cartTotal');
const closeCartBtn = document.getElementById('closeCart');
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const searchItems = document.getElementById('searchItems');
const searchTitle = document.getElementById('searchTitle');
const foodWasteBanner = document.getElementById('foodWasteBanner');
const userAvatar = document.getElementById('userAvatar');
const menuItems = document.querySelectorAll('.menu-item');
const loginModal = document.getElementById('loginModal');
const closeLogin = document.getElementById('closeLogin');
const loginUsername = document.getElementById('loginUsername');
const loginPassword = document.getElementById('loginPassword');
const togglePassword = document.getElementById('togglePassword');
const loginBtn = document.getElementById('loginBtn');
const forgotPasswordBtn = document.getElementById('forgotPasswordBtn');
const registerBtn = document.getElementById('registerBtn');
const registerModal = document.getElementById('registerModal');
const closeRegister = document.getElementById('closeRegister');
const registerUsername = document.getElementById('registerUsername');
const registerPassword = document.getElementById('registerPassword');
const toggleRegisterPassword = document.getElementById('toggleRegisterPassword');
const securityQuestion = document.getElementById('securityQuestion');
const securityAnswer = document.getElementById('securityAnswer');
const registerSubmitBtn = document.getElementById('registerSubmitBtn');
const forgotPasswordModal = document.getElementById('forgotPasswordModal');
const closeForgotPassword = document.getElementById('closeForgotPassword');
const forgotUsername = document.getElementById('forgotUsername');
const forgotSecurityQuestion = document.getElementById('forgotSecurityQuestion');
const forgotSecurityAnswer = document.getElementById('forgotSecurityAnswer');
const forgotSubmitBtn = document.getElementById('forgotSubmitBtn');
const loadingSpinner = document.getElementById('loadingSpinner');
const forgotResult = document.getElementById('forgotResult');
const usernameError = document.getElementById('usernameError');
const passwordError = document.getElementById('passwordError');

// 初始化
function init() {
    // 显示用餐人数选择弹窗
    showModal(peopleModal);
    
    // 绑定事件
    bindEvents();
}

// 绑定事件
function bindEvents() {
    // 拨号盘按钮点击事件
    dialBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const number = parseInt(btn.dataset.number);
            peopleCount = number;
            peopleCountEl.textContent = number;
        });
    });
    
    // 确认人数按钮点击事件
    confirmPeopleBtn.addEventListener('click', () => {
        if (peopleCount > 0) {
            hideModal(peopleModal);
            orderPage.classList.add('active');
        } else {
            alert('请选择用餐人数');
        }
    });
    
    // 跳过用餐人数选择
    skipPeopleBtn.addEventListener('click', () => {
        hideModal(peopleModal);
        orderPage.classList.add('active');
    });
    
    // 底部导航栏按钮点击事件
    navBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // 移除所有按钮的active类
            navBtns.forEach(b => b.classList.remove('active'));
            // 添加当前按钮的active类
            btn.classList.add('active');
            
            const page = btn.dataset.page;
            
            // 隐藏所有页面
            orderPage.classList.remove('active');
            searchPage.classList.remove('active');
            profilePage.classList.remove('active');
            
            // 显示对应页面
            if (page === 'home') {
                orderPage.classList.add('active');
            } else if (page === 'search') {
                searchPage.classList.add('active');
                // 清空搜索结果
                searchItems.innerHTML = '';
                searchTitle.textContent = '搜索结果';
            } else if (page === 'profile') {
                profilePage.classList.add('active');
            }
        });
    });
    
    // 搜索按钮点击事件
    searchBtn.addEventListener('click', () => {
        performSearch();
    });
    
    // 搜索输入框回车事件
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            performSearch();
        }
    });
    
    // 搜索输入框输入事件（实时搜索）
    searchInput.addEventListener('input', () => {
        showSearchSuggestions();
    });
    
    // 食物种类点击事件
    categoryItems.forEach((item, index) => {
        item.addEventListener('click', () => {
            // 移除所有种类的active类
            categoryItems.forEach(i => i.classList.remove('active'));
            // 添加当前种类的active类
            item.classList.add('active');
            
            // 更新滑块位置
            updateSliderPosition(index);
            
            // 滚动到对应分类
            const category = item.dataset.category;
            const section = document.querySelector(`.category-section[data-category="${category}"]`);
            if (section) {
                section.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
    
    // 右侧食物列表滚动事件
    foodList.addEventListener('scroll', () => {
        const scrollPosition = foodList.scrollTop;
        
        // 找到当前可见的分类
        let currentCategory = 'all';
        categorySections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (scrollPosition >= sectionTop - 100) {
                currentCategory = section.dataset.category;
            }
        });
        
        // 更新左侧分类选中状态
        categoryItems.forEach((item, index) => {
            if (item.dataset.category === currentCategory) {
                categoryItems.forEach(i => i.classList.remove('active'));
                item.classList.add('active');
                updateSliderPosition(index);
            }
        });
    });
    
    // 滑块拖动功能
    categorySlider.addEventListener('mousedown', (e) => {
        isDragging = true;
        startDrag(e);
    });
    
    document.addEventListener('mousemove', (e) => {
        if (isDragging) {
            dragSlider(e);
        }
    });
    
    document.addEventListener('mouseup', () => {
        isDragging = false;
    });
    
    // 触摸事件支持
    categorySlider.addEventListener('touchstart', (e) => {
        isDragging = true;
        startDrag(e.touches[0]);
    });
    
    document.addEventListener('touchmove', (e) => {
        if (isDragging) {
            dragSlider(e.touches[0]);
        }
    });
    
    document.addEventListener('touchend', () => {
        isDragging = false;
    });
    
    // 添加按钮点击事件
    addBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const foodCard = btn.closest('.food-card');
            const foodName = foodCard.querySelector('h3').textContent;
            const foodPrice = parseInt(foodCard.querySelector('.food-price').textContent.replace('¥', ''));
            
            // 添加到购物车
            addToCart(foodName, foodPrice);
            
            // 更新购物车显示
            updateCart();
        });
    });
    
    // 购物车按钮点击事件
    cartBtn.addEventListener('click', () => {
        showModal(cartModal);
        renderCartItems();
    });
    
    // 关闭购物车按钮点击事件
    closeCartBtn.addEventListener('click', () => {
        hideModal(cartModal);
    });
}

// 显示弹窗
function showModal(modal) {
    modal.classList.add('show');
}

// 隐藏弹窗
function hideModal(modal) {
    modal.classList.remove('show');
}

// 添加到购物车
function addToCart(name, price) {
    // 检查是否已存在该商品
    const existingItem = cart.find(item => item.name === name);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            name: name,
            price: price,
            quantity: 1
        });
    }
    
    // 显示添加成功提示
    showAddToCartToast(name);
    
    // 检查是否需要显示珍惜粮食横幅
    checkFoodWasteBanner();
}

// 更新购物车显示
function updateCart() {
    // 计算购物车商品总数
    const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    
    // 更新购物车数量显示
    cartCountEl.textContent = totalCount;
    
    // 显示或隐藏购物车按钮
    if (totalCount > 0) {
        cartBtn.classList.add('show');
    } else {
        cartBtn.classList.remove('show');
    }
    
    // 计算总价格
    const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    cartTotalEl.textContent = `¥${totalPrice}`;
}

// 渲染购物车商品
function renderCartItems() {
    cartItemsEl.innerHTML = '';
    
    cart.forEach(item => {
        const cartItemEl = document.createElement('div');
        cartItemEl.className = 'cart-item';
        
        cartItemEl.innerHTML = `
            <div class="cart-item-info">
                <div class="cart-item-name">${item.name}</div>
                <div class="cart-item-price">¥${item.price}</div>
            </div>
            <div class="cart-item-quantity">
                <button class="quantity-btn minus" data-name="${item.name}">-</button>
                <span class="quantity">${item.quantity}</span>
                <button class="quantity-btn plus" data-name="${item.name}">+</button>
            </div>
        `;
        
        cartItemsEl.appendChild(cartItemEl);
    });
    
    // 绑定数量调整按钮事件
    bindQuantityEvents();
}

// 绑定数量调整按钮事件
function bindQuantityEvents() {
    const minusBtns = document.querySelectorAll('.quantity-btn.minus');
    const plusBtns = document.querySelectorAll('.quantity-btn.plus');
    
    minusBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const foodName = btn.dataset.name;
            const itemIndex = cart.findIndex(item => item.name === foodName);
            
            if (itemIndex !== -1) {
                if (cart[itemIndex].quantity > 1) {
                    cart[itemIndex].quantity -= 1;
                } else {
                    cart.splice(itemIndex, 1);
                }
                
                updateCart();
                renderCartItems();
                checkFoodWasteBanner();
            }
        });
    });
    
    plusBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const foodName = btn.dataset.name;
            const itemIndex = cart.findIndex(item => item.name === foodName);
            
            if (itemIndex !== -1) {
                cart[itemIndex].quantity += 1;
                updateCart();
                renderCartItems();
                showAddToCartToast(foodName);
                checkFoodWasteBanner();
            }
        });
    });
}

// 显示添加到购物车的提示
function showAddToCartToast(name) {
    // 创建提示元素
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = `已将 ${name} 添加至购物车`;
    
    // 添加到页面
    document.body.appendChild(toast);
    
    // 显示提示
    setTimeout(() => {
        toast.classList.add('show');
    }, 100);
    
    // 3秒后隐藏提示
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => {
            document.body.removeChild(toast);
        }, 300);
    }, 3000);
}

// 检查是否需要显示珍惜粮食横幅
function checkFoodWasteBanner() {
    // 计算购物车商品总数
    const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    
    // 检查是否有商品超过5份
    const hasOverFive = cart.some(item => item.quantity > 5);
    
    // 检查是否需要显示横幅
    if (totalCount > 10 || hasOverFive) {
        foodWasteBanner.classList.add('show');
    } else {
        foodWasteBanner.classList.remove('show');
    }
}

// 更新滑块位置
function updateSliderPosition(index) {
    const itemHeight = categoryItems[index].offsetHeight;
    const top = index * itemHeight;
    categorySlider.style.top = `${top}px`;
    categorySlider.style.height = `${itemHeight}px`;
}

// 开始拖动
function startDrag(e) {
    e.preventDefault();
}

// 拖动滑块
function dragSlider(e) {
    e.preventDefault();
    const categoriesContainer = document.querySelector('.food-categories');
    const containerRect = categoriesContainer.getBoundingClientRect();
    const relativeY = e.clientY - containerRect.top;
    
    // 计算应该选中的分类
    const itemHeight = categoryItems[0].offsetHeight;
    const index = Math.floor(relativeY / itemHeight);
    
    // 确保索引在有效范围内
    if (index >= 0 && index < categoryItems.length) {
        // 触发对应分类的点击事件
        categoryItems[index].click();
    }
}

// 模拟食物数据
const foodData = [
    { name: '宫保鸡丁', price: 28, desc: '经典川菜，鸡肉嫩滑，花生香脆', category: 'hot' },
    { name: '麻婆豆腐', price: 22, desc: '四川特色，豆腐嫩滑，麻辣鲜香', category: 'hot' },
    { name: '鱼香肉丝', price: 26, desc: '甜酸辣味，肉丝鲜嫩，配菜丰富', category: 'hot' },
    { name: '糖醋排骨', price: 32, desc: '酸甜可口，排骨酥烂，老少皆宜', category: 'hot' },
    { name: '红烧肉', price: 38, desc: '肥而不腻，入口即化', category: 'hot' },
    { name: '拍黄瓜', price: 12, desc: '清爽可口，开胃小菜', category: 'cold' },
    { name: '凉拌木耳', price: 16, desc: '爽口开胃，营养丰富', category: 'cold' },
    { name: '夫妻肺片', price: 28, desc: '四川特色，麻辣鲜香', category: 'cold' },
    { name: '酸辣汤', price: 18, desc: '酸辣可口，开胃健脾', category: 'soup' },
    { name: '番茄鸡蛋汤', price: 15, desc: '酸甜可口，营养丰富', category: 'soup' },
    { name: '排骨莲藕汤', price: 28, desc: '汤清味鲜，营养滋补', category: 'soup' },
    { name: '米饭', price: 3, desc: '香软可口，粒粒分明', category: 'staple' },
    { name: '馒头', price: 2, desc: '松软可口，麦香浓郁', category: 'staple' },
    { name: '面条', price: 10, desc: '筋道爽口，口感丰富', category: 'staple' },
    { name: '可乐', price: 8, desc: '冰镇可口，解暑佳品', category: 'drink' },
    { name: '雪碧', price: 8, desc: '清爽可口，柠檬味浓', category: 'drink' },
    { name: '豆浆', price: 6, desc: '营养丰富，口感细腻', category: 'drink' }
];

// 显示搜索建议
function showSearchSuggestions() {
    const searchTerm = searchInput.value.trim();
    
    // 清除之前的搜索结果
    searchItems.innerHTML = '';
    
    if (!searchTerm) {
        searchTitle.textContent = '搜索结果';
        return;
    }
    
    // 过滤搜索建议
    const suggestions = foodData.filter(food => 
        food.name.includes(searchTerm)
    );
    
    // 显示搜索建议
    if (suggestions.length > 0) {
        searchTitle.textContent = '搜索建议';
        suggestions.forEach(food => {
            const suggestionItem = document.createElement('div');
            suggestionItem.className = 'search-suggestion';
            suggestionItem.textContent = food.name;
            
            // 点击建议项填充到搜索框并执行搜索
            suggestionItem.addEventListener('click', () => {
                searchInput.value = food.name;
                performSearch();
            });
            
            searchItems.appendChild(suggestionItem);
        });
    } else {
        searchTitle.textContent = '没有找到相关建议';
    }
}

// 执行搜索
function performSearch() {
    const searchTerm = searchInput.value.trim();
    
    if (!searchTerm) {
        searchTitle.textContent = '请输入搜索关键词';
        searchItems.innerHTML = '';
        return;
    }
    
    // 过滤搜索结果
    const results = foodData.filter(food => 
        food.name.includes(searchTerm)
    );
    
    // 更新搜索结果
    searchTitle.textContent = `猜您需要：${searchTerm}`;
    
    if (results.length === 0) {
        searchItems.innerHTML = '<div class="no-results">没有找到相关菜品</div>';
        return;
    }
    
    // 显示搜索结果
    searchItems.innerHTML = '';
    results.forEach(food => {
        const foodCard = document.createElement('div');
        foodCard.className = 'food-card';
        foodCard.innerHTML = `
            <div class="food-image"></div>
            <div class="food-info">
                <h3>${food.name}</h3>
                <p>${food.desc}</p>
                <div class="food-price">¥${food.price}</div>
            </div>
            <button class="add-btn">+</button>
        `;
        searchItems.appendChild(foodCard);
    });
    
    // 为搜索结果中的添加按钮绑定事件
    const searchAddBtns = searchItems.querySelectorAll('.add-btn');
    searchAddBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const foodCard = btn.closest('.food-card');
            const foodName = foodCard.querySelector('h3').textContent;
            const foodPrice = parseInt(foodCard.querySelector('.food-price').textContent.replace('¥', ''));
            
            // 添加到购物车
            addToCart(foodName, foodPrice);
            
            // 更新购物车显示
            updateCart();
        });
    });
}

// 绑定我的页面事件
function bindProfileEvents() {
    // 头像点击事件
    userAvatar.addEventListener('click', () => {
        showModal(loginModal);
    });
    
    // 菜单项点击事件
    menuItems.forEach(item => {
        item.addEventListener('click', () => {
            if (!isLoggedIn) {
                showToast('您还未登录，请登录！');
            }
        });
    });
    
    // 关闭登录弹窗
    closeLogin.addEventListener('click', () => {
        hideModal(loginModal);
    });
    
    // 关闭注册弹窗
    closeRegister.addEventListener('click', () => {
        hideModal(registerModal);
    });
    
    // 关闭找回密码弹窗
    closeForgotPassword.addEventListener('click', () => {
        hideModal(forgotPasswordModal);
    });
    
    // 切换密码显示/隐藏
    togglePassword.addEventListener('mousedown', () => {
        loginPassword.type = 'text';
    });
    
    togglePassword.addEventListener('mouseup', () => {
        loginPassword.type = 'password';
    });
    
    togglePassword.addEventListener('touchstart', () => {
        loginPassword.type = 'text';
    });
    
    togglePassword.addEventListener('touchend', () => {
        loginPassword.type = 'password';
    });
    
    // 切换注册密码显示/隐藏
    toggleRegisterPassword.addEventListener('mousedown', () => {
        registerPassword.type = 'text';
    });
    
    toggleRegisterPassword.addEventListener('mouseup', () => {
        registerPassword.type = 'password';
    });
    
    toggleRegisterPassword.addEventListener('touchstart', () => {
        registerPassword.type = 'text';
    });
    
    toggleRegisterPassword.addEventListener('touchend', () => {
        registerPassword.type = 'password';
    });
    
    // 登录按钮点击事件
    loginBtn.addEventListener('click', () => {
        const username = loginUsername.value.trim();
        const password = loginPassword.value.trim();
        
        if (username && password) {
            const user = findUser(username);
            if (user && user.password === password) {
                isLoggedIn = true;
                userData = user;
                hideModal(loginModal);
                showToast('登录成功！');
            } else {
                showToast('账户或密码错误');
            }
        } else {
            showToast('请输入账户和密码');
        }
    });
    
    // 注册按钮点击事件
    registerBtn.addEventListener('click', () => {
        hideModal(loginModal);
        showModal(registerModal);
    });
    
    // 找回密码按钮点击事件
    forgotPasswordBtn.addEventListener('click', () => {
        hideModal(loginModal);
        showModal(forgotPasswordModal);
    });
    
    // 用户名输入验证
    registerUsername.addEventListener('input', () => {
        const username = registerUsername.value.trim();
        if (username.length < 3) {
            usernameError.textContent = '用户名最少3位数字';
        } else {
            usernameError.textContent = '';
        }
    });
    
    // 密码输入验证
    registerPassword.addEventListener('input', () => {
        const password = registerPassword.value.trim();
        if (password.length < 6) {
            passwordError.textContent = '密码最少6位';
        } else if (isConsecutive(password)) {
            passwordError.textContent = '密码不能是连贯数字';
        } else {
            passwordError.textContent = '';
        }
    });
    
    // 注册提交按钮点击事件
    registerSubmitBtn.addEventListener('click', () => {
        const username = registerUsername.value.trim();
        const password = registerPassword.value.trim();
        const question = securityQuestion.value;
        const answer = securityAnswer.value.trim();
        
        if (!username || username.length < 3) {
            usernameError.textContent = '用户名最少3位数字';
            return;
        }
        
        if (!password || password.length < 6 || isConsecutive(password)) {
            passwordError.textContent = '密码最少6位且不能是连贯数字';
            return;
        }
        
        if (!answer) {
            showToast('请输入密保答案');
            return;
        }
        
        // 检查账户是否已存在
        if (findUser(username)) {
            showToast('账户已存在，请使用其他用户名');
            return;
        }
        
        // 创建新用户
        const newUser = { username, password, question, answer };
        addUser(newUser);
        
        // 登录新用户
        isLoggedIn = true;
        userData = newUser;
        hideModal(registerModal);
        showToast('注册成功！');
    });
    
    // 找回密码提交按钮点击事件
    forgotSubmitBtn.addEventListener('click', () => {
        const username = forgotUsername.value.trim();
        const question = forgotSecurityQuestion.value;
        const answer = forgotSecurityAnswer.value.trim();
        
        if (!username || !answer) {
            showToast('请输入账户和密保答案');
            return;
        }
        
        // 显示加载动画
        loadingSpinner.classList.add('show');
        forgotResult.textContent = '';
        
        // 模拟验证过程
        setTimeout(() => {
            loadingSpinner.classList.remove('show');
            
            // 从localStorage中查找用户
            const user = findUser(username);
            if (user && user.question === question && user.answer === answer) {
                forgotResult.textContent = `您的密码是：${user.password}`;
                forgotResult.className = 'result-message success';
            } else {
                forgotResult.textContent = '密保/账户对应错误，请重试';
                forgotResult.className = 'result-message error';
            }
        }, 3000);
    });
}

// 检查密码是否为连贯数字
function isConsecutive(password) {
    // 检查是否为相同数字
    if (/^(\d)\1+$/.test(password)) {
        return true;
    }
    
    // 检查是否为连续数字
    for (let i = 0; i < password.length - 1; i++) {
        if (parseInt(password[i]) + 1 !== parseInt(password[i + 1])) {
            return false;
        }
    }
    return true;
}

// 显示提示
function showToast(message) {
    // 创建提示元素
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    
    // 添加到页面
    document.body.appendChild(toast);
    
    // 显示提示
    setTimeout(() => {
        toast.classList.add('show');
    }, 100);
    
    // 2秒后隐藏提示
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => {
            document.body.removeChild(toast);
        }, 300);
    }, 2000);
}

// 页面加载完成后初始化
window.addEventListener('DOMContentLoaded', () => {
    init();
    bindProfileEvents();
});
