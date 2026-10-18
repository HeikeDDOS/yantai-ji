const purchaseDate = new Date(2023, 8, 7);

// 二十年为限：总天数 7300 天
const TWENTY_YEARS_DAYS = 7300;

function getToday() {
	return new Date();
}

function daysBetween(a, b) {
	return Math.floor(Math.abs(b - a) / 86400000);
}

function getAge(target = null) {
	const end = target || getToday();
	let y = end.getFullYear() - purchaseDate.getFullYear();
	let m = end.getMonth() - purchaseDate.getMonth();
	let d = end.getDate() - purchaseDate.getDate();
	if (d < 0) {
		m--;
		d += new Date(end.getFullYear(), end.getMonth(), 0).getDate();
	}
	if (m < 0) {
		y--;
		m += 12;
	}
	const td = daysBetween(purchaseDate, end);
	return {
		y,
		m,
		d,
		totalDays: td,
		weeks: Math.floor(td / 7),
		rem: td % 7
	};
}

function totalMonths() {
	const t = getToday();
	return (t.getFullYear() - purchaseDate.getFullYear()) * 12 + t.getMonth() - purchaseDate.getMonth();
}

function anniversary() {
	const t = getToday();
	let ann = new Date(t.getFullYear(), purchaseDate.getMonth(), purchaseDate.getDate());
	if (t > ann) ann = new Date(t.getFullYear() + 1, purchaseDate.getMonth(), purchaseDate.getDate());
	const num = ann.getFullYear() - purchaseDate.getFullYear();
	return {
		daysUntil: Math.ceil((ann - t) / 86400000),
		num,
		date: ann
	};
}

function fmt(d) {
	return `${d.getFullYear()}年${String(d.getMonth()+1).padStart(2,'0')}月${String(d.getDate()).padStart(2,'0')}日`;
}

// 里程碑列表：控制在20年（7300天）以内
const milestonesList = [{
		day: 30,
		label: '满月',
		poetic: '月盈则亏，相伴则满'
	},
	{
		day: 100,
		label: '百天',
		poetic: '百日筑基，初现光华'
	},
	{
		day: 365,
		label: '一周年',
		poetic: '寒暑一轮，春秋一度'
	},
	{
		day: 500,
		label: '五百日',
		poetic: '半千之数，厚积薄发'
	},
	{
		day: 730,
		label: '两周年',
		poetic: '二载同行，渐入佳境'
	},
	{
		day: 1000,
		label: '千日',
		poetic: '千日之约，金石为开'
	},
	{
		day: 1095,
		label: '三周年',
		poetic: '三载寒暑，情深意重'
	},
	{
		day: 1460,
		label: '四周年',
		poetic: '四时轮转，初心不改'
	},
	{
		day: 1825,
		label: '五周年',
		poetic: '五年磨砺，砚台生光'
	},
	{
		day: 2190,
		label: '六周年',
		poetic: '六合之内，皆为序章'
	},
	{
		day: 2555,
		label: '七周年',
		poetic: '七载同行，如胶似漆'
	},
	{
		day: 2920,
		label: '八周年',
		poetic: '八年积淀，厚德载物'
	},
	{
		day: 3285,
		label: '九周年',
		poetic: '九九归一，返璞归真'
	},
	{
		day: 3650,
		label: '十周年',
		poetic: '十年一剑，霜刃初试'
	},
	{
		day: 4380,
		label: '十二周年',
		poetic: '一轮生肖，岁月如歌'
	},
	{
		day: 5475,
		label: '十五周年',
		poetic: '十五月圆，花好人间'
	},
	{
		day: 6205,
		label: '十七周年',
		poetic: '十七年华，风华正茂'
	},
	{
		day: 6935,
		label: '十九周年',
		poetic: '十九载路，步步生莲'
	},
	{
		day: 7300,
		label: '二十周年',
		poetic: '廿年之约，砚台鎏金'
	},
];

function update() {
	const age = getAge();
	const ann = anniversary();

	// 匾额
	document.getElementById('heroDays').textContent = age.totalDays;

	// 详情
	document.getElementById('detailInfo').innerHTML = `
                <li><span class="key">购置于</span><span class="val">癸卯年七月廿三</span></li>
                <li><span class="key">公历</span><span class="val">2023年9月7日</span></li>
                <li><span class="key">今日</span><span class="val">${fmt(getToday())}</span></li>
                <li><span class="key">已相伴</span><span class="val">${age.y}年 ${age.m}月 ${age.d}天</span></li>
                <li><span class="key">计月</span><span class="val">${totalMonths()}个月</span></li>
                <li><span class="key">计周</span><span class="val">${age.weeks}周零${age.rem}天</span></li>
            `;

	// 周年
	document.getElementById('anniversaryInfo').innerHTML = `
                <div class="anniversary-block">
                    <div class="anniversary-enzo">🎂</div>
                    <h3>第 ${ann.num} 个周年</h3>
                    <p style="color:var(--ink-light);margin-bottom:16px;">${fmt(ann.date)}</p>
                    <div class="countdown">${ann.daysUntil}</div>
                    <div class="countdown-label">日后 · 如期而至</div>
                </div>
            `;

	// 二十年进度条
	const twentyYearPercent = Math.min(100, Math.round((age.totalDays / TWENTY_YEARS_DAYS) * 100));
	const remainingDays = Math.max(0, TWENTY_YEARS_DAYS - age.totalDays);
	document.getElementById('twentyYearBar').innerHTML = `
                <div class="bar-info">
                    <span class="bar-title">廿年之约 · 已完成 ${twentyYearPercent}%</span>
                    <span class="bar-percent">${remainingDays > 0 ? '尚余 ' + remainingDays + ' 日' : '约成！廿年已至'}</span>
                </div>
                <div class="bar-track">
                    <div class="bar-fill" style="width:${twentyYearPercent}%"></div>
                </div>
                <div class="bar-markers">
                    <span>0</span><span>5年</span><span>10年</span><span>15年</span><span>20年</span>
                </div>
            `;

	// 竹简里程碑
	document.getElementById('milestones').innerHTML = milestonesList.map(m => {
		const arrived = age.totalDays >= m.day;
		const remaining = Math.max(0, m.day - age.totalDays);
		// 如果里程碑超过20年，标记为超出范围
		const beyond = m.day > TWENTY_YEARS_DAYS;
		let statusClass, knotClass, statusText;
		if (beyond) {
			statusClass = 'beyond-label';
			knotClass = 'beyond';
			statusText = '廿年之外';
		} else if (arrived) {
			statusClass = 'done';
			knotClass = 'arrived';
			statusText = '已至';
		} else {
			statusClass = 'waiting';
			knotClass = 'awaiting';
			statusText = '尚余 ' + remaining + ' 日';
		}
		return `
                    <div class="slip-item${beyond ? ' beyond-scope' : ''}">
                        <div class="slip-knot ${knotClass}"></div>
                        <div class="slip-content">
                            <div class="slip-title">${m.day} 天 · ${m.label}</div>
                            <div class="slip-sub">${m.poetic}</div>
                        </div>
                        <span class="slip-status ${statusClass}">${statusText}</span>
                    </div>
                `;
	}).join('');

	// 时钟
	const n = new Date();
	document.getElementById('liveTime').textContent =
		`${n.getFullYear()}年${String(n.getMonth()+1).padStart(2,'0')}月${String(n.getDate()).padStart(2,'0')}日 · ${String(n.getHours()).padStart(2,'0')}时${String(n.getMinutes()).padStart(2,'0')}分${String(n.getSeconds()).padStart(2,'0')}秒`;
}

function toast(m) {
	const t = document.createElement('div');
	t.className = 'toast';
	t.textContent = m;
	document.body.appendChild(t);
	setTimeout(() => t.remove(), 3000);
}

window.refreshData = () => {
	update();
	toast('砚台新墨，已研');
};
window.viewFutureDate = () => {
	document.getElementById('futureModal').style.display = 'flex';
};
window.closeModal = () => {
	document.getElementById('futureModal').style.display = 'none';
};
window.calculateFuture = () => {
	const v = document.getElementById('futureDate').value;
	if (!v) return toast('请择一日');
	const fd = new Date(v);
	if (fd <= purchaseDate) return toast('此日尚在购置之前');
	const a = getAge(fd);
	alert(`${v}\n\n已过 ${a.totalDays} 日\n即 ${a.y}年 ${a.m}月 ${a.d}天`);
	closeModal();
};
window.saveReport = () => {
	const a = getAge();
	const ann = anniversary();
	const twentyPercent = Math.min(100, Math.round((a.totalDays / TWENTY_YEARS_DAYS) * 100));
	const text = [
		'　　　砚　台　记',
		'　 ── 电脑使用时光报告 ──',
		'',
		`　购置：癸卯年七月廿三（2023.09.07）`,
		`　录于：${fmt(getToday())}`,
		'',
		`　相伴：${a.y}年 ${a.m}月 ${a.d}天`,
		`　累计：${a.totalDays} 日 / ${totalMonths()} 月`,
		`　周数：${a.weeks}周零${a.rem}天`,
		`　廿年之约：已完成 ${twentyPercent}%（${a.totalDays}/${TWENTY_YEARS_DAYS}）`,
		'',
		`　下个周年：第${ann.num}个 · ${fmt(ann.date)}`,
		`　倒计：${ann.daysUntil} 日`,
		'',
		'　岁月刻度（二十年为限）：',
		...milestonesList.map(m => {
			const done = a.totalDays >= m.day;
			const beyond = m.day > TWENTY_YEARS_DAYS;
			if (beyond) return `　  · ${m.day}日 · ${m.label} （廿年之外）`;
			return `　  ${done ? '●' : '○'} ${m.day}日 · ${m.label} ${done ? '已至' : '尚余'+(m.day-a.totalDays)+'日'}`;
		}),
		'',
		'　　　　　　　　　　　砚台记　录毕',
	].join('\n');
	const b = new Blob([text], {
		type: 'text/plain;charset=utf-8'
	});
	const link = document.createElement('a');
	link.href = URL.createObjectURL(b);
	link.download = `砚台记_${new Date().toISOString().slice(0,10)}.txt`;
	link.click();
	toast('存墨为证，已存');
};

document.getElementById('futureModal').addEventListener('click', function(e) {
	if (e.target === this) closeModal();
});

update();
setInterval(update, 1000);