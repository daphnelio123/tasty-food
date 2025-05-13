
// food_calorie_calculator/frontend/js/app.js
document.addEventListener('DOMContentLoaded', function() {
  // 初始化粒子效果
  initParticles();
  
  // 初始化UI事件
  initUIEvents();
  
  // 初始化本地存储数据
  initStorageData();
  
  // 用户信息计算按钮事件
  document.getElementById('calculateDailyBtn').addEventListener('click', calculateDailyCalories);
  document.getElementById('clearUserBtn').addEventListener('click', clearUserInput);
});

// 计算每日建议卡路里
function calculateDailyCalories() {
  const height = parseFloat(document.getElementById('height').value);
  const weight = parseFloat(document.getElementById('weight').value);
  const dailyResult = document.getElementById('dailyResult');

  if (!height || !weight) {
    alert('请输入完整的身高和体重信息');
    return;
  }

  // Harris-Benedict公式计算基础代谢率(BMR)
  const bmr = 88.362 + (13.397 * weight) + (4.799 * height) - (5.677 * 30); // 假设年龄30岁
  const dailyCalorie = bmr * 1.55; // 中等活动水平

  // 显示结果
  document.getElementById('bmrValue').textContent = Math.round(bmr);
  document.getElementById('dailyCalorie').textContent = Math.round(dailyCalorie);
  dailyResult.classList.remove('hidden');

  // 保存到本地存储
  localStorage.setItem('userData', JSON.stringify({
    height: height,
    weight: weight,
    bmr: Math.round(bmr),
    dailyCalorie: Math.round(dailyCalorie)
  }));
}

// 清空用户输入
function clearUserInput() {
  document.getElementById('height').value = '';
  document.getElementById('weight').value = '';
  document.getElementById('dailyResult').classList.add('hidden');
  localStorage.removeItem('userData');
}

// 加载用户数据
function loadUserData() {
  const userData = JSON.parse(localStorage.getItem('userData'));
  if (userData) {
    document.getElementById('height').value = userData.height;
    document.getElementById('weight').value = userData.weight;
    document.getElementById('bmrValue').textContent = userData.bmr;
    document.getElementById('dailyCalorie').textContent = userData.dailyCalorie;
    document.getElementById('dailyResult').classList.remove('hidden');
  }
}

// 初始化本地存储数据
function initStorageData() {
  updateHistoryDisplay();
  updateFavoritesDisplay();
  loadUserData();
}

// 其余已有代码保持不变...
