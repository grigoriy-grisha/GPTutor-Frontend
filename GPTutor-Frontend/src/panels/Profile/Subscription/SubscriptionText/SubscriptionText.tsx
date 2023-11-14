import React from "react";

import { subscriptionsController } from "$/entity/subscriptions";

function SubscriptionText() {
  return (
    <div>
      <ul style={{ listStyle: "none" }}>
        <li>Генерируйте сразу 4 фотографии от 10 секунд!</li>
        <li>Настраивайте размеры фотографий!</li>
        <li>10 голосов!</li>
      </ul>
    </div>
  );
}

export default SubscriptionText;
