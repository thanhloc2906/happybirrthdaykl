document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('container');
    const giftButton = document.getElementById('gift-button');
    const giftModal = document.getElementById('gift-modal');
    const messageContainer = document.getElementById('message-container');
    
    const textToAnimate = "Happy Birthday to you Mai Linh!"; // Thay đổi tên tùy ý
    const characters = [];
    const cakeShape = []; // Tọa độ cho hình bánh
    const fireworkCount = 20;

    // Bước 1: Tạo các ký tự và phân tán ngẫu nhiên
    const createCharacters = () => {
        for (let i = 0; i < textToAnimate.length; i++) {
            const charDiv = document.createElement('div');
            charDiv.classList.add('character');
            charDiv.textContent = textToAnimate[i];
            charDiv.style.left = `${Math.random() * 100}%`;
            charDiv.style.top = `${Math.random() * 100}%`;
            charDiv.style.opacity = '1';
            characters.push(charDiv);
            container.appendChild(charDiv);
        }
    };

    // Bước 2: Chuyển thành hình bánh sinh nhật (mô phỏng)
    const formCake = () => {
        // Đây là phần phức tạp, bạn cần tính toán tọa độ cho từng ký tự
        // để tạo hình bánh và ngày tháng.
        // Ví dụ đơn giản, chúng ta sẽ di chuyển chúng về một vị trí cố định
        // và bạn có thể thay đổi để tạo hình dạng phức tạp hơn.
        characters.forEach((char, index) => {
            const x = 50 + (index - textToAnimate.length / 2) * 2; // Ví dụ: sắp xếp hàng ngang
            const y = 60;
            char.style.left = `${x}vw`;
            char.style.top = `${y}vh`;
            char.style.transform = `translate(-50%, -50%) rotate(${Math.random() * 360}deg)`;
        });
    };

    // Bước 3: Hiển thị chữ và hiệu ứng
    const showMessageAndFireworks = () => {
        // Tùy chỉnh để chữ bay ra từ bánh
        messageContainer.classList.remove('hidden');

        // Tạo hiệu ứng pháo hoa
        for (let i = 0; i < fireworkCount; i++) {
            const firework = document.createElement('div');
            firework.classList.add('firework');
            // Thêm style và animation cho pháo hoa
            container.appendChild(firework);
        }
    };
    
    // Bước 4: Hiển thị nút sau 10 giây
    setTimeout(() => {
        giftButton.classList.remove('hidden');
    }, 10000);

    // Bước 5: Xử lý khi nhấn nút
    giftButton.addEventListener('click', () => {
        giftModal.classList.remove('hidden');
        giftButton.classList.add('hidden');
    });

    // Bắt đầu chuỗi hiệu ứng
    createCharacters();
    // Phát nhạc ở đây
    
    setTimeout(() => {
        formCake();
    }, 3000); // Sau 3 giây, các ký tự bắt đầu xếp hình

    setTimeout(() => {
        showMessageAndFireworks();
    }, 6000); // Sau 6 giây, pháo hoa và chữ xuất hiện
});