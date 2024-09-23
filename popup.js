
        const style = document.createElement('style');
        style.textContent = `
            :root {
                --sd-font-size: 15px;
                --sd-font-weight: 500;
                --sd-success-color: #4CAF50;
                --sd-success-bg-color: #f0fdf4;
                --sd-success-text-color: rgba(16, 161, 109, 1);
                --sd-failure-color: #f44336;
                --sd-failure-bg-color: #ffe6e6;
                --sd-failure-text-color: rgba(225, 48, 48, 1);
                --sd-warning-color: #ff9800;
                --sd-warning-bg-color: #fff8e1;
                --sd-warning-text-color: rgba(217, 157, 18, 1);
                --sd-info-color: #2196F3;
                --sd-info-bg-color: #e3f2fd;
                --sd-info-text-color: rgba(44, 133, 220, 1);
            }

            .sd_alert-container {
                font-family: sans-serif;
                position:fixed;
                top: 20px;
                right: 20px;
                width: 300px;
                z-index:99999999999;
            }

            .sd_alert-box {
                position: relative;
                padding: 15px;
                margin-bottom: 10px;
                border-radius: 5px;
                box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
                display: flex;
                justify-content: space-between;
                align-items: center;
                border-left: 5px solid;
                animation: sd_slide-in 0.3s ease-in-out;
                font-size: var(--sd-font-size);
                font-weight: var(--sd-font-weight);
            }
            .sd_alert-box.sd_success {
                border-left-color: var(--sd-success-color);
                background-color: var(--sd-success-bg-color);
                color: var(--sd-success-text-color);
            }
            .sd_alert-box.sd_failure {
                border-left-color: var(--sd-failure-color);
                background-color: var(--sd-failure-bg-color);
                color: var(--sd-failure-text-color);
            }
            .sd_alert-box.sd_warning {
                border-left-color: var(--sd-warning-color);
                background-color: var(--sd-warning-bg-color);
                color: var(--sd-warning-text-color);
            }
            .sd_alert-box.sd_info {
                border-left-color: var(--sd-info-color);
                background-color: var(--sd-info-bg-color);
                color: var(--sd-info-text-color);
            }

            .sd_alert-icon {
                border-radius: 50px;
                margin-right: 15px;
                min-width: 28px;
                min-height: 28px;
                max-width: 28px;
                max-height: 28px;
            }

            .sd_close-btn {
                cursor: pointer;
                background-color: transparent;
                border: none;
                font-size: 23px;
                color: inherit;
                min-width: 25px;
                max-height: 25px;
                display:flex;
                align-items:center;
                justify-content:center;
                margin-left: 10px;
            }

            @keyframes sd_slide-in {
                from { transform: translateX(115%); }
                to { transform: translateX(-15px); }
            }

            @keyframes sd_slide-out {
                from { transform: translateX(0); opacity: 1; }
                to { transform: translateX(110%); opacity: 0; }
            }

            .sd_alert-hidden {
                animation: sd_slide-out 0.3s ease-in-out forwards;
            }
        `;
        document.head.appendChild(style);

        const alertContainer = document.createElement('div');
        alertContainer.className = 'sd_alert-container';
        document.body.appendChild(alertContainer);

        const icons = {
            success: '<svg class="sd_alert-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="rgba(16,161,109,1)"><path d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM11.0026 16L18.0737 8.92893L16.6595 7.51472L11.0026 13.1716L8.17421 10.3431L6.75999 11.7574L11.0026 16Z"></path></svg>',
            failure: '<svg class="sd_alert-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="rgba(225,48,48,1)"><path d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM12 10.5858L9.17157 7.75736L7.75736 9.17157L10.5858 12L7.75736 14.8284L9.17157 16.2426L12 13.4142L14.8284 16.2426L16.2426 14.8284L13.4142 12L16.2426 9.17157L14.8284 7.75736L12 10.5858Z"></path></svg>',
            warning: '<svg class="sd_alert-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="rgba(217,157,18,1)"><path d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM11 15V17H13V15H11ZM11 7V13H13V7H11Z"></path></svg>',
            info: '<svg class="sd_alert-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="rgba(44,133,220,1)"><path d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM11 11V17H13V11H11ZM11 7V9H13V7H11Z"></path></svg>'
        };

        function createAlert(type, message) {
            const alertBox = document.createElement('div');
            alertBox.classList.add('sd_alert-box', `sd_${type}`);

            const closeButton = document.createElement('button');
            closeButton.innerHTML = '&times;';
            closeButton.classList.add('sd_close-btn');
            closeButton.onclick = () => closeAlert(alertBox);

            alertBox.innerHTML = `${icons[type]} <span class="sd_message">${message}</span>`;
            alertBox.appendChild(closeButton);

            alertContainer.appendChild(alertBox);
            setTimeout(() => closeAlert(alertBox), 3000);
        }

        function closeAlert(alertBox) {
            alertBox.classList.add('sd_alert-hidden');
            setTimeout(() => alertBox.remove(), 300); 
        }

        function success(message) {
            createAlert('success', message);
        }

        function failure(message) {
            createAlert('failure', message);
        }

        function warning(message) {
            createAlert('warning', message);
        }

        function info(message) {
            createAlert('info', message);
        }
