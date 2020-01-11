$.ajaxSetup({
  headers: {
    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
  }
});

function request(url, method = 'GET', data = null, headers = {}) {
  return new Promise((resolve, reject) => {
    $.ajax({
      url: `${APP_URL}${url}`,
      contentType: 'application/json; charset=utf-8',
      data: data ? JSON.stringify(data) : null,
      dataType: 'json',
      error: (jqXHR, textStatus, errorThrown) => {
        reject(errorThrown);
      },
      headers,
      method,
      success: data => {
        resolve(data);
      }
    });
  });
}
