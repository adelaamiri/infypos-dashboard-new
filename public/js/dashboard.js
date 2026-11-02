(function () {
  const rawData = document.getElementById('dashboard-data');
  const dashboardData = rawData ? JSON.parse(rawData.textContent) : {};

  const moneyTick = (value) => {
    if (value === 0) return '$ 0,0';
    return `$ ${Math.round(value / 1000)}K`;
  };

  const weekly = dashboardData.weeklySalesPurchases || [];
  const products = dashboardData.topProductsYear || [];
  const customers = dashboardData.topCustomersMonth || [];

  const chartDefaults = {
    color: '#687482',
    font: {
      family: 'Inter',
      size: 12
    }
  };

  if (window.Chart) {
    Chart.defaults.font.family = chartDefaults.font.family;
    Chart.defaults.color = chartDefaults.color;

    const pieLeaderLineLabels = {
      id: 'pieLeaderLineLabels',
      afterDatasetsDraw(chart, args, options) {
        if (!options?.display || chart.config.type !== 'pie') return;

        const meta = chart.getDatasetMeta(0);
        const dataset = chart.data.datasets[0];
        const { ctx } = chart;

        ctx.save();
        ctx.font = '500 15px Inter, Arial, sans-serif';
        ctx.lineWidth = 2;

        meta.data.forEach((arc, index) => {
          const value = dataset.data[index];
          if (!value) return;

          const props = arc.getProps(['x', 'y', 'startAngle', 'endAngle', 'outerRadius'], true);
          const angle = (props.startAngle + props.endAngle) / 2;
          const cos = Math.cos(angle);
          const sin = Math.sin(angle);
          const color = dataset.backgroundColor[index] || '#6374f6';
          const startX = props.x + cos * (props.outerRadius - 4);
          const startY = props.y + sin * (props.outerRadius - 4);
          const bendX = props.x + cos * (props.outerRadius + 24);
          const bendY = props.y + sin * (props.outerRadius + 24);
          const naturalEndX = bendX + (cos >= 0 ? 34 : -34);
          const endX =
            cos >= 0
              ? Math.min(naturalEndX, chart.width - 82)
              : Math.max(naturalEndX, 78);
          const endY = bendY;
          const textX = endX + (cos >= 0 ? 8 : -8);

          ctx.strokeStyle = color;
          ctx.fillStyle = '#4f5966';
          ctx.textAlign = cos >= 0 ? 'left' : 'right';
          ctx.textBaseline = 'middle';
          ctx.beginPath();
          ctx.moveTo(startX, startY);
          ctx.lineTo(bendX, bendY);
          ctx.lineTo(endX, endY);
          ctx.stroke();
          ctx.fillText(chart.data.labels[index], textX, endY);
        });

        ctx.restore();
      }
    };

    Chart.register(pieLeaderLineLabels);

    const weeklyCanvas = document.getElementById('weeklyChart');
    if (weeklyCanvas) {
      new Chart(weeklyCanvas, {
      type: 'bar',
      data: {
        labels: weekly.map((item) => item.date),
        datasets: [
          {
            label: 'Sales',
            data: weekly.map((item) => item.sales),
            borderColor: '#5b9ded',
            backgroundColor: 'rgba(91, 157, 237, 0.78)',
            borderWidth: 2,
            borderRadius: 5,
            barPercentage: 0.7,
            categoryPercentage: 0.72
          },
          {
            label: 'Purchases',
            data: weekly.map((item) => item.purchases),
            borderColor: '#2fd6b5',
            backgroundColor: 'rgba(47, 214, 181, 0.62)',
            borderWidth: 2,
            borderRadius: 5,
            barPercentage: 0.7,
            categoryPercentage: 0.72
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'top',
            labels: {
              boxWidth: 42,
              padding: 18
            }
          },
          tooltip: {
            callbacks: {
              label: (context) => `${context.dataset.label}: $ ${context.parsed.y.toLocaleString()}`
            }
          }
        },
        scales: {
          x: {
            grid: { color: 'rgba(42, 47, 58, 0.08)' }
          },
          y: {
            min: 0,
            max: 9000,
            ticks: {
              stepSize: 1000,
              callback: moneyTick
            },
            title: {
              display: true,
              text: 'Amount'
            },
            grid: { color: 'rgba(42, 47, 58, 0.08)' }
          }
        }
      }
    });
  }

    const makePie = (canvasId, items) => {
      const canvas = document.getElementById(canvasId);
      if (!canvas) return;

      new Chart(canvas, {
      type: 'pie',
      data: {
        labels: items.map((item) => item.name),
        datasets: [
          {
            data: items.map((item) => item.grandTotal || item.total),
            backgroundColor: items.map((item) => item.color),
            borderWidth: 0,
            hoverOffset: 18,
            hoverBorderColor: '#ffffff',
            hoverBorderWidth: 3
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        layout: {
          padding: {
            top: 52,
            right: 126,
            bottom: 48,
            left: 58
          }
        },
        plugins: {
          pieLeaderLineLabels: {
            display: canvasId === 'productsPie'
          },
          legend: {
            display: false
          }
        },
        animation: {
          duration: 450,
          easing: 'easeOutQuart'
        },
        hover: {
          mode: 'nearest',
          intersect: true
        }
      }
      });
    };

    makePie('productsPie', products);
    makePie('customersPie', customers);
  }

  document.querySelectorAll('[data-sidebar-toggle]').forEach((button) => {
    button.addEventListener('click', () => {
      const sidebar = document.getElementById('sidebar');
      const isMobile = window.matchMedia('(max-width: 900px)').matches;

      if (isMobile) {
        sidebar?.classList.toggle('open');
        document.body.classList.remove('sidebar-collapsed');
        return;
      }

      sidebar?.classList.remove('open');
      document.body.classList.toggle('sidebar-collapsed');
    });
  });

  const greetingTarget = document.querySelector('[data-time-greeting]');
  const greetingIcon = document.querySelector('[data-time-greeting-icon]');
  if (greetingTarget) {
    const hour = new Date().getHours();
    let greeting = 'Good Morning';
    let icon = '🌅';

    if (hour >= 12 && hour < 18) {
      greeting = 'Good Afternoon';
      icon = '🌞';
    } else if (hour >= 18 || hour < 5) {
      greeting = 'Good Evening';
      icon = '🌙';
    }

    greetingTarget.textContent = greeting;
    if (greetingIcon) greetingIcon.textContent = icon;
  }

  document.querySelectorAll('[data-sidebar-submenu]').forEach((button) => {
    button.addEventListener('click', () => {
      const key = button.getAttribute('data-sidebar-submenu');
      const panel = document.querySelector(`[data-sidebar-submenu-panel="${key}"]`);

      button.classList.toggle('open');
      panel?.classList.toggle('open');
    });
  });

  const dropdownTriggers = document.querySelectorAll('[data-dropdown-trigger]');
  const closeDropdowns = (exceptKey) => {
    document.querySelectorAll('[data-dropdown-menu]').forEach((menu) => {
      const key = menu.getAttribute('data-dropdown-menu');
      if (key === exceptKey) return;

      menu.classList.remove('open');
      document
        .querySelector(`[data-dropdown-trigger="${key}"]`)
        ?.setAttribute('aria-expanded', 'false');
    });
  };

  dropdownTriggers.forEach((trigger) => {
    trigger.addEventListener('click', (event) => {
      event.preventDefault();
      event.stopPropagation();

      const key = trigger.getAttribute('data-dropdown-trigger');
      const menu = document.querySelector(`[data-dropdown-menu="${key}"]`);
      const willOpen = !menu?.classList.contains('open');

      closeDropdowns(key);
      menu?.classList.toggle('open', willOpen);
      trigger.setAttribute('aria-expanded', String(willOpen));
    });
  });

  document.querySelectorAll('[data-store-option]').forEach((option) => {
    option.addEventListener('click', (event) => {
      event.stopPropagation();

      const storeName = option.getAttribute('data-store-option');
      const storeLabel = document.querySelector('[data-store-label]');
      if (storeLabel && storeName) storeLabel.textContent = storeName;

      document.querySelectorAll('.store-option').forEach((item) => {
        item.querySelector('.radio-dot')?.classList.remove('checked');
        item.querySelector('span:last-child')?.classList.remove('selected');
      });

      option.querySelector('.radio-dot')?.classList.add('checked');
      option.querySelector('span:last-child')?.classList.add('selected');
      closeDropdowns();
    });
  });

  const originalDateLabel = document.querySelector('[data-date-label]')?.textContent || '';
  document.querySelectorAll('[data-date-option]').forEach((option) => {
    option.addEventListener('click', (event) => {
      event.stopPropagation();

      document.querySelectorAll('[data-date-option]').forEach((item) => {
        item.classList.remove('active');
      });

      option.classList.add('active');
      closeDropdowns();
    });
  });

  document.querySelector('[data-date-reset]')?.addEventListener('click', (event) => {
    event.stopPropagation();

    const dateLabel = document.querySelector('[data-date-label]');
    if (dateLabel) dateLabel.textContent = originalDateLabel;

    document.querySelectorAll('[data-date-option]').forEach((item) => {
      item.classList.toggle('active', item.getAttribute('data-date-option') === 'This Month');
    });
    closeDropdowns();
  });

  document.addEventListener('click', () => closeDropdowns());
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeDropdowns();
  });

  const modalBackdrop = document.querySelector('[data-modal-backdrop]');
  const closeModals = () => {
    document.querySelectorAll('[data-modal]').forEach((modal) => {
      modal.classList.remove('open');
    });
    if (modalBackdrop) modalBackdrop.hidden = true;
  };

  document.querySelectorAll('[data-modal-open]').forEach((button) => {
    button.addEventListener('click', (event) => {
      event.preventDefault();
      event.stopPropagation();

      const modalName = button.getAttribute('data-modal-open');
      const modal = document.querySelector(`[data-modal="${modalName}"]`);
      closeDropdowns();

      if (modalBackdrop && modal) {
        modalBackdrop.hidden = false;
        modal.classList.add('open');
        modal.querySelector('input, select, button')?.focus();
      }
    });
  });

  document.querySelectorAll('[data-modal-close]').forEach((button) => {
    button.addEventListener('click', closeModals);
  });

  modalBackdrop?.addEventListener('click', (event) => {
    if (event.target === modalBackdrop) closeModals();
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeModals();
  });

  const pageRecordConfigs = {
    '/products': {
      collection: 'products',
      label: 'Product',
      fields: ['name', 'code', 'brand', 'price', 'unit', 'stock', 'time', 'date'],
      defaults: { image: 'placeholder' }
    },
    '/product-categories': {
      collection: 'productCategories',
      label: 'Product Category',
      fields: ['name', 'count']
    },
    '/variations': {
      collection: 'variations',
      label: 'Variation',
      fields: ['name', 'types']
    },
    '/brands': {
      collection: 'brands',
      label: 'Brand',
      fields: ['name', 'count'],
      defaults: { image: 'placeholder' }
    },
    '/units': {
      collection: 'units',
      label: 'Unit',
      fields: ['name', 'shortName', 'baseUnit', 'time', 'date']
    },
    '/base-units': {
      collection: 'baseUnits',
      label: 'Base Unit',
      fields: ['name']
    },
    '/adjustments': {
      collection: 'adjustments',
      label: 'Adjustment',
      fields: ['reference', 'warehouse', 'totalProducts', 'time', 'date']
    },
    '/transfers': {
      collection: 'transfers',
      label: 'Transfer',
      fields: ['reference', 'fromWarehouse', 'toWarehouse', 'items', 'grandTotal', 'status', 'time', 'date']
    },
    '/quotations': {
      collection: 'quotations',
      label: 'Quotation',
      fields: ['reference', 'customer', 'warehouse', 'status', 'grandTotal', 'time', 'date']
    },
    '/purchases': {
      collection: 'purchases',
      label: 'Purchase',
      fields: ['reference', 'supplier', 'warehouse', 'status', 'grandTotal', 'paid', 'due', 'paymentStatus', 'paymentType', 'time', 'date']
    },
    '/purchase-returns': {
      collection: 'purchaseReturns',
      label: 'Purchase Return',
      fields: ['reference', 'supplier', 'warehouse', 'status', 'grandTotal', 'time', 'date']
    },
    '/sales': {
      collection: 'sales',
      label: 'Sale',
      fields: ['reference', 'user', 'customer', 'warehouse', 'status', 'grandTotal', 'paid', 'due', 'paymentStatus', 'paymentType', 'time', 'date']
    },
    '/sales-returns': {
      collection: 'salesReturns',
      label: 'Sales Return',
      fields: ['reference', 'customer', 'warehouse', 'status', 'grandTotal', 'time', 'date']
    },
    '/expenses': {
      collection: 'expenses',
      label: 'Expense',
      fields: ['reference', 'user', 'title', 'warehouse', 'category', 'amount', 'time', 'date']
    },
    '/expense-categories': {
      collection: 'expenseCategories',
      label: 'Expense Category',
      fields: ['name']
    },
    '/suppliers': {
      collection: 'suppliers',
      label: 'Supplier',
      fields: ['name', 'email', 'phone', 'time', 'date']
    },
    '/customers': {
      collection: 'customers',
      label: 'Customer',
      fields: ['name', 'email', 'phone', 'time', 'date']
    },
    '/users': {
      collection: 'users',
      label: 'User',
      fields: ['initials', 'name', 'email', 'role', 'phone', 'stores', 'time', 'date']
    },
    '/wallet-requests': {
      collection: 'walletRequests',
      label: 'Wallet Request',
      fields: ['name', 'email', 'transactionType', 'amount', 'type', 'time', 'date', 'action']
    },
    '/roles': {
      collection: 'roles',
      label: 'Role',
      fields: ['name', 'date']
    },
    '/warehouse': {
      collection: 'warehouses',
      label: 'Warehouse',
      fields: ['name', 'email', 'phone', 'country', 'city', 'zip', 'time', 'date']
    },
    '/stores': {
      collection: 'stores',
      label: 'Store',
      fields: ['name', 'users'],
      toggles: ['enabled']
    },
    '/currencies': {
      collection: 'currencies',
      label: 'Currency',
      fields: ['name', 'code', 'symbol']
    },
    '/languages': {
      collection: 'languages',
      label: 'Language',
      fields: ['name', 'isoCode'],
      toggles: ['enabled']
    },
    '/payment-methods': {
      collection: 'paymentMethods',
      label: 'Payment Method',
      fields: ['name'],
      toggles: ['enabled']
    },
    '/email-templates': {
      collection: 'emailTemplates',
      label: 'Email Template',
      fields: ['name', 'content'],
      toggles: ['enabled']
    },
    '/sms-templates': {
      collection: 'smsTemplates',
      label: 'SMS Template',
      fields: ['name', 'content'],
      toggles: ['enabled']
    }
  };

  const activeRecordConfig = pageRecordConfigs[window.location.pathname];
  let activeRecords = [];
  let pendingDeleteIndex = null;

  const titleize = (value) =>
    value
      .replace(/([A-Z])/g, ' $1')
      .replace(/^./, (letter) => letter.toUpperCase());

  const showDynamicMessage = (message, isError = false) => {
    const existing = document.querySelector('[data-dynamic-message]');
    existing?.remove();

    const notice = document.createElement('div');
    notice.setAttribute('data-dynamic-message', '');
    notice.textContent = message;
    notice.style.cssText = [
      'position:fixed',
      'right:24px',
      'bottom:24px',
      'z-index:9999',
      'max-width:360px',
      'padding:12px 14px',
      'border-radius:8px',
      'box-shadow:0 12px 34px rgba(15,23,42,.18)',
      `background:${isError ? '#fef2f2' : '#ecfdf5'}`,
      `color:${isError ? '#991b1b' : '#065f46'}`,
      `border:1px solid ${isError ? '#fecaca' : '#bbf7d0'}`
    ].join(';');
    document.body.appendChild(notice);
    setTimeout(() => notice.remove(), 4500);
  };

  const dynamicFetch = async (url, options = {}) => {
    const response = await fetch(url, {
      headers: { 'Content-Type': 'application/json' },
      ...options
    });
    const payload = await response.json().catch(() => ({}));

    if (!response.ok) {
      throw new Error(payload.message || 'Unable to save this change.');
    }

    return payload;
  };

  const getRecordRows = () =>
    Array.from(document.querySelectorAll('.product-table tbody tr')).filter(
      (row) => !row.classList.contains('table-total-row')
    );

  const markRecordRows = () => {
    getRecordRows().forEach((row, index) => {
      row.dataset.recordIndex = String(index);
    });
  };

  const buildRecordForm = (mode, record = {}, recordIndex = '') => {
    const modal = document.querySelector('[data-modal="edit-record-modal"]');
    const form = modal?.querySelector('form');
    const title = modal?.querySelector('#edit-record-title');
    if (!modal || !form || !activeRecordConfig) return;

    if (title) {
      title.textContent = `${mode === 'create' ? 'Create' : 'Edit'} ${activeRecordConfig.label}`;
    }

    form.dataset.dynamicRecordForm = 'true';
    form.dataset.mode = mode;
    form.dataset.recordIndex = String(recordIndex);
    form.innerHTML = '';

    [...activeRecordConfig.fields, ...(activeRecordConfig.toggles || [])].forEach((field) => {
      const label = document.createElement('label');
      const span = document.createElement('span');
      span.textContent = `${titleize(field)}:`;
      label.appendChild(span);

      if ((activeRecordConfig.toggles || []).includes(field)) {
        const select = document.createElement('select');
        select.name = field;
        ['true', 'false'].forEach((value) => {
          const option = document.createElement('option');
          option.value = value;
          option.textContent = value === 'true' ? 'Enabled' : 'Disabled';
          option.selected = String(record[field] ?? true) === value;
          select.appendChild(option);
        });
        label.appendChild(select);
      } else {
        const input = document.createElement(field === 'content' ? 'textarea' : 'input');
        input.name = field;
        input.value = record[field] ?? activeRecordConfig.defaults?.[field] ?? '';
        if (field === 'email') input.type = 'email';
        if (field.toLowerCase().includes('date')) input.placeholder = 'YYYY-MM-DD';
        label.appendChild(input);
      }

      form.appendChild(label);
    });

    const actions = document.createElement('div');
    actions.className = 'modal-actions customer-password-actions';
    actions.innerHTML = '<button class="button-primary" type="submit">Save</button><button class="button-muted" type="button" data-modal-close>Cancel</button>';
    form.appendChild(actions);
    actions.querySelector('[data-modal-close]')?.addEventListener('click', closeModals);
  };

  const formToRecord = (form) => {
    const record = { ...(activeRecordConfig.defaults || {}) };
    const formData = new FormData(form);

    for (const [key, value] of formData.entries()) {
      if ((activeRecordConfig.toggles || []).includes(key)) {
        record[key] = value === 'true';
      } else {
        record[key] = value;
      }
    }

    return record;
  };

  const openRecordModal = (mode, record = {}, index = '') => {
    const modal = document.querySelector('[data-modal="edit-record-modal"]');
    buildRecordForm(mode, record, index);
    if (modalBackdrop && modal) {
      modalBackdrop.hidden = false;
      modal.classList.add('open');
      modal.querySelector('input, select, textarea, button')?.focus();
    }
  };

  if (activeRecordConfig) {
    markRecordRows();

    dynamicFetch(`/api/records/${activeRecordConfig.collection}`)
      .then((records) => {
        activeRecords = Array.isArray(records) ? records : [];
      })
      .catch((error) => showDynamicMessage(error.message, true));

    document.querySelectorAll('.create-button, .quick-action-item').forEach((button) => {
      button.addEventListener('click', (event) => {
        event.preventDefault();
        event.stopPropagation();
        closeDropdowns();
        openRecordModal('create', {});
      });
    });

    document.querySelectorAll('.product-search input[type="search"]').forEach((input) => {
      input.addEventListener('input', () => {
        const query = input.value.trim().toLowerCase();
        getRecordRows().forEach((row) => {
          row.hidden = query && !row.textContent.toLowerCase().includes(query);
        });
      });
    });

    document.addEventListener('click', (event) => {
      const editButton = event.target.closest('.edit-action, [data-modal-open="edit-record-modal"]');
      if (editButton) {
        const row = editButton.closest('tr');
        const index = Number(row?.dataset.recordIndex);
        if (row && Number.isInteger(index)) {
          event.preventDefault();
          event.stopPropagation();
          openRecordModal('edit', activeRecords[index] || {}, index);
        }
      }

      const deleteButton = event.target.closest('.delete-action, [data-modal-open="delete-modal"], .row-action-item');
      const isDeleteAction =
        deleteButton?.classList.contains('delete-action') ||
        deleteButton?.getAttribute('data-modal-open') === 'delete-modal' ||
        deleteButton?.textContent.toLowerCase().includes('delete');

      if (deleteButton && isDeleteAction) {
        const row = deleteButton.closest('tr');
        pendingDeleteIndex = Number(row?.dataset.recordIndex);
      }
    });

    document.querySelector('[data-modal="delete-modal"] .delete-confirm')?.addEventListener('click', async (event) => {
      if (!Number.isInteger(pendingDeleteIndex)) return;
      event.preventDefault();

      try {
        await dynamicFetch(`/api/records/${activeRecordConfig.collection}/${pendingDeleteIndex}`, {
          method: 'DELETE'
        });
        window.location.reload();
      } catch (error) {
        showDynamicMessage(error.message, true);
      }
    });

    document.querySelector('[data-modal="edit-record-modal"] form')?.addEventListener('submit', async (event) => {
      const form = event.currentTarget;
      if (form.dataset.dynamicRecordForm !== 'true') return;

      event.preventDefault();
      const record = formToRecord(form);
      const mode = form.dataset.mode;
      const index = form.dataset.recordIndex;

      try {
        await dynamicFetch(
          mode === 'create'
            ? `/api/records/${activeRecordConfig.collection}`
            : `/api/records/${activeRecordConfig.collection}/${index}`,
          {
            method: mode === 'create' ? 'POST' : 'PUT',
            body: JSON.stringify({ record })
          }
        );
        window.location.reload();
      } catch (error) {
        showDynamicMessage(error.message, true);
      }
    });

    document.querySelectorAll('[data-toggle-switch]').forEach((toggle) => {
      toggle.addEventListener('click', async () => {
        const row = toggle.closest('tr');
        const index = Number(row?.dataset.recordIndex);
        const field = activeRecordConfig.toggles?.[0];
        if (!field || !Number.isInteger(index)) return;

        const record = {
          ...(activeRecords[index] || {}),
          [field]: toggle.classList.contains('is-on')
        };

        try {
          await dynamicFetch(`/api/records/${activeRecordConfig.collection}/${index}`, {
            method: 'PUT',
            body: JSON.stringify({ record })
          });
          activeRecords[index] = record;
          showDynamicMessage('Saved to MongoDB.');
        } catch (error) {
          toggle.classList.toggle('is-on');
          toggle.setAttribute('aria-pressed', String(toggle.classList.contains('is-on')));
          showDynamicMessage(error.message, true);
        }
      });
    });
  }

  document.querySelectorAll('.input-with-icon button').forEach((button) => {
    button.addEventListener('click', () => {
      const input = button.parentElement?.querySelector('input');
      if (!input) return;

      input.type = input.type === 'password' ? 'text' : 'password';
    });
  });

  document.querySelectorAll('.mini-switch').forEach((toggle) => {
    toggle.setAttribute('role', 'button');
    toggle.setAttribute('tabindex', '0');
    toggle.setAttribute('aria-pressed', String(toggle.classList.contains('on')));

    const flipMiniSwitch = () => {
      const isOn = !toggle.classList.contains('on');
      toggle.classList.toggle('on', isOn);
      toggle.setAttribute('aria-pressed', String(isOn));
    };

    toggle.addEventListener('click', flipMiniSwitch);
    toggle.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        flipMiniSwitch();
      }
    });
  });

  document.querySelectorAll('.modal-form, .profile-card').forEach((form) => {
    form.addEventListener('submit', (event) => {
      if (form.dataset.dynamicRecordForm === 'true') return;
      event.preventDefault();
    });
  });

  if (window.lucide) {
    window.lucide.createIcons();
  }
})();
