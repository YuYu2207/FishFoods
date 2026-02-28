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
const settingsPage = document.getElementById('settingsPage');
const adminPage = document.getElementById('adminPage');
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

// 新添加的DOM元素
const adminLoginBtn = document.getElementById('adminLoginBtn');
const adminFunctionBtn = document.getElementById('adminFunctionBtn');
const backToProfileBtn = document.getElementById('backToProfileBtn');
const backToSettingsBtn = document.getElementById('backToSettingsBtn');
const backToAdminBtn = document.getElementById('backToAdminBtn');
const backToAdminFromDishBtn = document.getElementById('backToAdminFromDishBtn');
const manageDishesBtn = document.getElementById('manageDishesBtn');
const addDishBtn = document.getElementById('addDishBtn');
const manageUsersBtn = document.getElementById('manageUsersBtn');
const userListPage = document.getElementById('userListPage');
const userList = document.getElementById('userList');
const dishManagementPage = document.getElementById('dishManagementPage');
const dishList = document.getElementById('dishList');
const editDishModal = document.getElementById('editDishModal');
const closeEditDish = document.getElementById('closeEditDish');
const editDishName = document.getElementById('editDishName');
const editDishPrice = document.getElementById('editDishPrice');
const editDishDesc = document.getElementById('editDishDesc');
const cancelEditDish = document.getElementById('cancelEditDish');
const saveEditDish = document.getElementById('saveEditDish');
const adminLoginModal = document.getElementById('adminLoginModal');
const closeAdminLogin = document.getElementById('closeAdminLogin');
const adminUsername = document.getElementById('adminUsername');
const adminPassword = document.getElementById('adminPassword');
const toggleAdminPassword = document.getElementById('toggleAdminPassword');
const adminLoginSubmitBtn = document.getElementById('adminLoginSubmitBtn');
const addDishModal = document.getElementById('addDishModal');
const closeAddDish = document.getElementById('closeAddDish');
const dishName = document.getElementById('dishName');
const dishPrice = document.getElementById('dishPrice');
const dishCategory = document.getElementById('dishCategory');
const dishDesc = document.getElementById('dishDesc');
const dishImage = document.getElementById('dishImage');
const addDishSubmitBtn = document.getElementById('addDishSubmitBtn');

// 当前编辑的菜品索引
let currentEditDishIndex = -1;

// 全局变量
let isAdminLoggedIn = false;

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
            settingsPage.classList.remove('active');
            adminPage.classList.remove('active');
            userListPage.classList.remove('active');
            dishManagementPage.classList.remove('active');
            
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

// 从localStorage加载菜品数据
function loadFoodData() {
    const storedFoods = localStorage.getItem('foods');
    if (storedFoods) {
        return JSON.parse(storedFoods);
    } else {
        // 默认菜品数据
        const defaultFoods = [
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
        // 保存默认数据到localStorage
        saveFoodData(defaultFoods);
        return defaultFoods;
    }
}

// 保存菜品数据到localStorage
function saveFoodData(foods) {
    localStorage.setItem('foods', JSON.stringify(foods));
}

// 菜品数据
let foodData = loadFoodData();

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
            const foodPrice = parseFloat(foodCard.querySelector('.food-price').textContent.replace('¥', ''));
            
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
        item.addEventListener('click', (e) => {
            e.stopPropagation();
            const menu = item.dataset.menu;
            // 只对我的积分和我的会员菜单项进行登录验证
            if (menu === 'points' || menu === 'member') {
                if (!isLoggedIn) {
                    showToast('您还未登录，请登录！');
                }
            } else if (menu === 'settings') {
                // 跳转到设置页面
                profilePage.classList.remove('active');
                settingsPage.classList.add('active');
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
                
                // 更新头像下面的文字为欢迎信息
                const avatarLoginText = document.querySelector('.avatar-login-text');
                if (avatarLoginText) {
                    avatarLoginText.textContent = `尊敬的：${username} 欢迎使用！`;
                }
                
                // 显示退出登录按钮
                showLogoutButton();
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
        
        // 更新头像下面的文字为欢迎信息
        const avatarLoginText = document.querySelector('.avatar-login-text');
        if (avatarLoginText) {
            avatarLoginText.textContent = `尊敬的：${username} 欢迎使用！`;
        }
        
        // 显示退出登录按钮
        showLogoutButton();
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
    
    // 绑定设置页面事件
    bindSettingsEvents();
    
    // 绑定管理员相关事件
    bindAdminEvents();
}

// 绑定设置页面事件
function bindSettingsEvents() {
    // 管理员登录按钮点击事件
    adminLoginBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        showModal(adminLoginModal);
    });
    
    // 管理员功能按钮点击事件
    adminFunctionBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        settingsPage.classList.remove('active');
        adminPage.classList.add('active');
    });
    
    // 返回按钮点击事件
    backToProfileBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        settingsPage.classList.remove('active');
        profilePage.classList.add('active');
    });
    
    // 返回设置页面按钮点击事件
    backToSettingsBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        adminPage.classList.remove('active');
        settingsPage.classList.add('active');
    });
    
    // 管理菜品按钮点击事件
    manageDishesBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        // 跳转到菜品管理页面
        adminPage.classList.remove('active');
        dishManagementPage.classList.add('active');
        // 显示菜品列表
        showDishManagement();
    });
    
    // 返回管理员页面按钮点击事件（从菜品管理）
    if (backToAdminFromDishBtn) {
        backToAdminFromDishBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            // 返回到管理员功能页面
            dishManagementPage.classList.remove('active');
            adminPage.classList.add('active');
        });
    }
    
    // 添加菜品按钮点击事件
    addDishBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        showModal(addDishModal);
    });
    
    // 用户管理按钮点击事件
    if (manageUsersBtn) {
        manageUsersBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            // 跳转到用户列表页面
            adminPage.classList.remove('active');
            userListPage.classList.add('active');
            // 显示用户列表
            showUserManagement();
        });
    }
    
    // 返回管理员页面按钮点击事件
    if (backToAdminBtn) {
        backToAdminBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            // 返回到管理员功能页面
            userListPage.classList.remove('active');
            adminPage.classList.add('active');
        });
    }
}

// 显示退出登录按钮
function showLogoutButton() {
    // 检查是否已存在退出登录按钮
    let logoutButton = document.getElementById('logoutBtn');
    if (!logoutButton) {
        // 创建退出登录按钮
        logoutButton = document.createElement('div');
        logoutButton.id = 'logoutBtn';
        logoutButton.className = 'menu-item';
        logoutButton.style.color = 'red';
        logoutButton.textContent = '退出登录';
        
        // 添加到设置页面的菜单中
        const settingsMenu = settingsPage.querySelector('.profile-menu');
        if (settingsMenu) {
            // 找到返回按钮的位置，在其前面插入退出登录按钮
            const backButton = document.getElementById('backToProfileBtn');
            if (backButton) {
                settingsMenu.insertBefore(logoutButton, backButton);
            } else {
                settingsMenu.appendChild(logoutButton);
            }
            
            // 绑定退出登录事件
            logoutButton.addEventListener('click', (e) => {
                e.stopPropagation();
                // 确认退出
                if (confirm('确定要退出登录吗？')) {
                    isLoggedIn = false;
                    userData = {};
                    
                    // 恢复头像下面的文字
                    const avatarLoginText = document.querySelector('.avatar-login-text');
                    if (avatarLoginText) {
                        avatarLoginText.textContent = '登录';
                    }
                    
                    // 移除退出登录按钮
                    if (logoutButton) {
                        logoutButton.remove();
                    }
                    
                    showToast('已退出登录');
                }
            });
        }
    }
}

// 显示用户管理
function showUserManagement() {
    if (userList) {
        // 清空用户列表
        userList.innerHTML = '';
        
        // 创建加载动画
        const loadingSpinner = document.createElement('div');
        loadingSpinner.className = 'loading-spinner';
        loadingSpinner.style.display = 'block';
        loadingSpinner.style.margin = '50px auto';
        userList.appendChild(loadingSpinner);
        
        // 获取所有用户
        const users = getAllUsers();
        
        // 计算加载时间（每条账号0.5秒，封顶3.5秒）
        const loadingTime = Math.min(users.length * 500, 3500);
        
        // 模拟加载过程
        setTimeout(() => {
            // 移除加载动画
            loadingSpinner.remove();
            
            // 显示用户列表
            if (users.length > 0) {
                users.forEach(user => {
                    // 跳过管理员账户
                    if (user.username !== 'yuyu') {
                        const userCard = document.createElement('div');
                        userCard.style.display = 'flex';
                        userCard.style.alignItems = 'center';
                        userCard.style.justifyContent = 'space-between';
                        userCard.style.padding = '15px';
                        userCard.style.backgroundColor = '#fafafa';
                        userCard.style.borderRadius = '8px';
                        
                        // 用户信息
                        const userInfo = document.createElement('div');
                        userInfo.style.display = 'flex';
                        userInfo.style.alignItems = 'center';
                        userInfo.style.gap = '20px';
                        
                        const usernameSpan = document.createElement('span');
                        usernameSpan.textContent = `账户名：${user.username}`;
                        
                        const pointsSpan = document.createElement('span');
                        pointsSpan.textContent = `积分：${user.points || 0}`;
                        
                        userInfo.appendChild(usernameSpan);
                        userInfo.appendChild(pointsSpan);
                        
                        // 删除按钮
                        const deleteButton = document.createElement('button');
                        deleteButton.textContent = '删除';
                        deleteButton.style.padding = '8px 16px';
                        deleteButton.style.backgroundColor = 'red';
                        deleteButton.style.color = 'white';
                        deleteButton.style.border = 'none';
                        deleteButton.style.borderRadius = '4px';
                        deleteButton.style.cursor = 'pointer';
                        
                        // 绑定删除事件
                        deleteButton.addEventListener('click', () => {
                            if (confirm('确认要删除这个用户吗？')) {
                                // 从localStorage中删除用户
                                const updatedUsers = users.filter(u => u.username !== user.username);
                                saveUserData(updatedUsers);
                                
                                // 重新显示用户列表
                                showUserManagement();
                                showToast('用户已删除');
                            }
                        });
                        
                        userCard.appendChild(userInfo);
                        userCard.appendChild(deleteButton);
                        userList.appendChild(userCard);
                    }
                });
            } else {
                const noUsers = document.createElement('div');
                noUsers.textContent = '暂无用户';
                noUsers.style.textAlign = 'center';
                noUsers.style.padding = '20px';
                noUsers.style.color = '#999';
                userList.appendChild(noUsers);
            }
        }, loadingTime);
    }
}

// 显示菜品管理
function showDishManagement() {
    if (dishList) {
        // 清空菜品列表
        dishList.innerHTML = '';
        
        // 显示菜品列表
        if (foodData.length > 0) {
            foodData.forEach((dish, index) => {
                const dishCard = document.createElement('div');
                dishCard.style.display = 'flex';
                dishCard.style.alignItems = 'center';
                dishCard.style.justifyContent = 'space-between';
                dishCard.style.padding = '15px';
                dishCard.style.backgroundColor = '#fafafa';
                dishCard.style.borderRadius = '8px';
                
                // 菜品信息
                const dishInfo = document.createElement('div');
                dishInfo.style.display = 'flex';
                dishInfo.style.alignItems = 'center';
                dishInfo.style.gap = '15px';
                
                // 菜品图片
                const dishImg = document.createElement('div');
                dishImg.style.width = '60px';
                dishImg.style.height = '60px';
                dishImg.style.backgroundColor = '#ff7a45';
                dishImg.style.borderRadius = '8px';
                
                // 菜品详情
                const dishDetails = document.createElement('div');
                dishDetails.style.display = 'flex';
                dishDetails.style.flexDirection = 'column';
                dishDetails.style.gap = '5px';
                
                const nameSpan = document.createElement('span');
                nameSpan.textContent = `菜品名称：${dish.name}`;
                nameSpan.style.cursor = 'pointer';
                nameSpan.style.textDecoration = 'underline';
                nameSpan.style.color = '#ff7a45';
                
                const descSpan = document.createElement('span');
                descSpan.textContent = `描述：${dish.desc}`;
                descSpan.style.cursor = 'pointer';
                descSpan.style.textDecoration = 'underline';
                descSpan.style.color = '#ff7a45';
                
                const priceSpan = document.createElement('span');
                priceSpan.textContent = `价格：¥${dish.price}`;
                priceSpan.style.cursor = 'pointer';
                priceSpan.style.textDecoration = 'underline';
                priceSpan.style.color = '#ff7a45';
                
                // 绑定编辑事件
                nameSpan.addEventListener('click', () => {
                    openEditDishModal(index);
                });
                
                descSpan.addEventListener('click', () => {
                    openEditDishModal(index);
                });
                
                priceSpan.addEventListener('click', () => {
                    openEditDishModal(index);
                });
                
                dishDetails.appendChild(nameSpan);
                dishDetails.appendChild(descSpan);
                dishDetails.appendChild(priceSpan);
                
                dishInfo.appendChild(dishImg);
                dishInfo.appendChild(dishDetails);
                
                // 删除按钮
                const deleteButton = document.createElement('button');
                deleteButton.textContent = '删除';
                deleteButton.style.padding = '8px 16px';
                deleteButton.style.backgroundColor = 'red';
                deleteButton.style.color = 'white';
                deleteButton.style.border = 'none';
                deleteButton.style.borderRadius = '4px';
                deleteButton.style.cursor = 'pointer';
                
                // 绑定删除事件
                deleteButton.addEventListener('click', () => {
                    if (confirm('确认要删除这个菜品吗？')) {
                        // 从菜品数据中删除
                        foodData.splice(index, 1);
                        // 保存到localStorage
                        saveFoodData(foodData);
                        
                        // 重新显示菜品列表
                        showDishManagement();
                        // 更新主页菜品
                        updateHomePageDishes();
                        showToast('菜品已删除');
                    }
                });
                
                dishCard.appendChild(dishInfo);
                dishCard.appendChild(deleteButton);
                dishList.appendChild(dishCard);
            });
        } else {
            const noDishes = document.createElement('div');
            noDishes.textContent = '暂无菜品';
            noDishes.style.textAlign = 'center';
            noDishes.style.padding = '20px';
            noDishes.style.color = '#999';
            dishList.appendChild(noDishes);
        }
    }
}

// 打开编辑菜品弹窗
function openEditDishModal(index) {
    currentEditDishIndex = index;
    const dish = foodData[index];
    
    if (dish) {
        // 填充表单数据
        editDishName.value = dish.name;
        editDishPrice.value = dish.price;
        editDishDesc.value = dish.desc;
        
        // 显示弹窗
        showModal(editDishModal);
    }
}

// 绑定菜品编辑事件
function bindDishEditEvents() {
    // 关闭编辑弹窗
    closeEditDish.addEventListener('click', () => {
        hideModal(editDishModal);
    });
    
    // 取消编辑
    cancelEditDish.addEventListener('click', () => {
        hideModal(editDishModal);
    });
    
    // 保存编辑
    saveEditDish.addEventListener('click', () => {
        const name = editDishName.value.trim();
        const price = parseFloat(editDishPrice.value);
        const desc = editDishDesc.value.trim();
        
        if (!name) {
            showToast('菜品名称不得为空');
            return;
        }
        
        if (!price || isNaN(price) || price <= 0) {
            showToast('菜品价格不得为空且必须大于0');
            return;
        }
        
        // 更新菜品数据
        if (currentEditDishIndex >= 0 && currentEditDishIndex < foodData.length) {
            foodData[currentEditDishIndex] = {
                ...foodData[currentEditDishIndex],
                name: name,
                price: price,
                desc: desc
            };
            
            // 保存到localStorage
            saveFoodData(foodData);
            
            // 关闭弹窗
            hideModal(editDishModal);
            
            // 重新显示菜品列表
            showDishManagement();
            // 更新主页菜品
            updateHomePageDishes();
            showToast('菜品已更新');
        }
    });
}

// 更新主页菜品列表
function updateHomePageDishes() {
    // 获取所有分类section
    const categorySections = document.querySelectorAll('.category-section');
    
    // 清空所有分类的菜品
    categorySections.forEach(section => {
        const category = section.dataset.category;
        if (category !== 'all') {
            // 保留标题，移除所有菜品卡片
            const title = section.querySelector('h2');
            section.innerHTML = '';
            if (title) {
                section.appendChild(title);
            }
        }
    });
    
    // 重新添加菜品到对应分类
    foodData.forEach(dish => {
        const category = dish.category;
        const section = document.querySelector(`.category-section[data-category="${category}"]`);
        
        if (section) {
            const foodCard = document.createElement('div');
            foodCard.className = 'food-card';
            foodCard.innerHTML = `
                <div class="food-image"></div>
                <div class="food-info">
                    <h3>${dish.name}</h3>
                    <p>${dish.desc}</p>
                    <div class="food-price">¥${dish.price}</div>
                </div>
                <button class="add-btn">+</button>
            `;
            
            section.appendChild(foodCard);
            
            // 为新添加的按钮绑定事件
            const addBtn = foodCard.querySelector('.add-btn');
            addBtn.addEventListener('click', () => {
                const foodName = foodCard.querySelector('h3').textContent;
                const foodPrice = parseFloat(foodCard.querySelector('.food-price').textContent.replace('¥', ''));
                
                // 添加到购物车
                addToCart(foodName, foodPrice);
                
                // 更新购物车显示
                updateCart();
            });
        }
    });
    
    // 更新全部分类
    updateAllCategory();
}

// 更新全部分类
function updateAllCategory() {
    const allSection = document.querySelector('.category-section[data-category="all"]');
    if (allSection) {
        // 保留标题，移除所有菜品卡片
        const title = allSection.querySelector('h2');
        allSection.innerHTML = '';
        if (title) {
            allSection.appendChild(title);
        }
        
        // 添加所有菜品
        foodData.forEach(dish => {
            const foodCard = document.createElement('div');
            foodCard.className = 'food-card';
            foodCard.dataset.category = dish.category;
            foodCard.innerHTML = `
                <div class="food-image"></div>
                <div class="food-info">
                    <h3>${dish.name}</h3>
                    <p>${dish.desc}</p>
                    <div class="food-price">¥${dish.price}</div>
                </div>
                <button class="add-btn">+</button>
            `;
            
            allSection.appendChild(foodCard);
            
            // 为新添加的按钮绑定事件
            const addBtn = foodCard.querySelector('.add-btn');
            addBtn.addEventListener('click', () => {
                const foodName = foodCard.querySelector('h3').textContent;
                const foodPrice = parseFloat(foodCard.querySelector('.food-price').textContent.replace('¥', ''));
                
                // 添加到购物车
                addToCart(foodName, foodPrice);
                
                // 更新购物车显示
                updateCart();
            });
        });
    }
}

// 绑定管理员相关事件
function bindAdminEvents() {
    // 关闭管理员登录弹窗
    closeAdminLogin.addEventListener('click', () => {
        hideModal(adminLoginModal);
    });
    
    // 绑定菜品编辑事件
    bindDishEditEvents();
    
    // 切换管理员密码显示/隐藏
    toggleAdminPassword.addEventListener('mousedown', () => {
        adminPassword.type = 'text';
    });
    
    toggleAdminPassword.addEventListener('mouseup', () => {
        adminPassword.type = 'password';
    });
    
    toggleAdminPassword.addEventListener('touchstart', () => {
        adminPassword.type = 'text';
    });
    
    toggleAdminPassword.addEventListener('touchend', () => {
        adminPassword.type = 'password';
    });
    
    // 管理员登录验证
    adminLoginSubmitBtn.addEventListener('click', () => {
        const username = adminUsername.value.trim();
        const password = adminPassword.value.trim();
        
        // 固定管理员账户密码
        if (username === 'yuyu' && password === '051220') {
            isAdminLoggedIn = true;
            hideModal(adminLoginModal);
            showToast('管理员登录成功！');
            
            // 切换按钮显示
            adminLoginBtn.style.display = 'none';
            adminFunctionBtn.style.display = 'block';
        } else {
            showToast('管理员账户或密码错误');
        }
    });
    
    // 关闭添加菜品弹窗
    closeAddDish.addEventListener('click', () => {
        hideModal(addDishModal);
    });
    
    // 添加菜品提交
    addDishSubmitBtn.addEventListener('click', () => {
        const name = dishName.value.trim();
        const price = parseFloat(dishPrice.value);
        const category = dishCategory.value;
        const desc = dishDesc.value.trim();
        
        if (!name || !price || isNaN(price)) {
            showToast('请填写菜品名称和价格');
            return;
        }
        
        // 创建新菜品对象
        const newDish = {
            name: name,
            price: price,
            desc: desc || '暂无描述',
            category: category
        };
        
        // 添加到菜品数据
        foodData.push(newDish);
        // 保存到localStorage
        saveFoodData(foodData);
        
        // 更新主页菜品列表
        updateHomePageDishes();
        
        // 隐藏弹窗
        hideModal(addDishModal);
        
        // 显示成功提示
        showToast('添加成功，请前往主页查看');
        
        // 清空表单
        dishName.value = '';
        dishPrice.value = '';
        dishDesc.value = '';
        dishImage.value = '';
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
