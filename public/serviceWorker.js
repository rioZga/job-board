const sw = /** @type {ServiceWorkerGlobalScope & typeof globalThis} */ (
  globalThis
);

sw.addEventListener("push", (event) => {
  const message = event.data?.json();
  const { title, body, icon, data } = message;

  async function handlePushEvent() {
    await sw.registration.showNotification(title, {
      body,
      icon: icon || "/logo.png",
      data,
      actions: [{ title: "view", action: "view" }],
    });
  }

  event.waitUntil(handlePushEvent());
});

sw.addEventListener("notificationclick", (event) => {
  const notification = event.notification;
  notification.close();

  const slug = notification.data.slug;
  sw.clients.openWindow(`/jobs/${slug}`);
});
