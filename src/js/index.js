document.addEventListener('DOMContentLoaded', () => {
	const cards = document.querySelectorAll('.list__card')
	const showMoreBtn = document.getElementById('show-more')
	const tags = document.querySelectorAll('.tag')

	let visibleCount = 6 // скільки показувати спочатку
	let activeFilter = 'all'

	// Функція показу карток
	function updateCards() {
		let shown = 0
		cards.forEach(card => {
			const cardTags = card.getAttribute('data-tags')
			const match = activeFilter === 'all' || cardTags === activeFilter

			if (match && shown < visibleCount) {
				card.style.display = 'block'
				shown++
			} else {
				card.style.display = 'none'
			}
		})

		// Перевірка чи є ще картки
		const totalVisible = [...cards].filter(card => {
			const cardTags = card.getAttribute('data-tags')
			return activeFilter === 'all' || cardTags === activeFilter
		}).length

		if (visibleCount >= totalVisible) {
			showMoreBtn.style.display = 'none'
		} else {
			showMoreBtn.style.display = 'inline-block'
		}
	}

	// Початковий рендер
	updateCards()

	// Клік по табах
	tags.forEach(tag => {
		tag.addEventListener('click', () => {
			tags.forEach(t => t.classList.remove('active'))
			tag.classList.add('active')
			activeFilter = tag.getAttribute('data-filter')
			visibleCount = 6 // ресет при зміні таба
			updateCards()
		})
	})

	// Клік по кнопці "Показати ще"
	showMoreBtn.addEventListener('click', () => {
		visibleCount += 6 // додаємо ще 6
		updateCards()
	})

	// наприклад при завантаженні сторінки
	document.querySelectorAll('.fade-in').forEach((el, i) => {
		setTimeout(() => el.classList.add('show'), i * 500)
	})
})
