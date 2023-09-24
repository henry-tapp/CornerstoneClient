import {
  ApiListData,
  ApiListResponse,
  ApiResponseData,
  Reservation,
  ReservationClient,
  ReservationState,
} from "@accesso/loqueue-qsmart-nextgen-shared-components";

// DEV Use, This all changed when using the config driven API bits
const getApiUrl = (path?: string) => {
  // This may require the use of the CRA Proxy during development
  return `http://localhost:3000/v2${path ?? ""}`;
};

export function getAllReservationExamples() {
  return {
    time: "2022-08-23T14:00:03.000Z",
    expires_in: 27,
    expires_at: "2022-08-23T14:00:30.000Z",
    count: 9,
    items: getItemExamples(),
  } as ApiListResponse<Reservation, ReservationClient>;
}

export function getReservationExamplesById(
  reservationId: string,
  state: ReservationState
) {
  return {
    time: "2022-08-23T14:00:03.000Z",
    expires_in: 27,
    expires_at: "2022-08-23T14:00:30.000Z",
    data: getDataExample(reservationId, state),
    client_data: getClientDataExample(state),
    actions: [
      {
        type: "cancel",
        text: "Cancel",
        secondText: "",
        href: "https://",
        requires_confirm: true,
        confirm_text: "Really cancel your reservation for Batman?",
        tags: [],
        disabled: false,
        method: "post",
      },
      {
        type: "reschedule",
        text: "Reschedule",
        href: "https://",
        disabled: state === "on_hold",
        method: "post",
      },
    ],
    links: {
      self: getApiUrl(`/reservations/${reservationId}`),
      attraction: getApiUrl(
        `/attractions/b22b0d95-1401-4143-b171-01fff6094f1d`
      ),
      attraction_thumb: getApiUrl(
        `/attractions/b22b0d95-1401-4143-b171-01fff6094f1d/thumb`
      ),
    },
  } as ApiResponseData<Reservation, ReservationClient>;
}

function getRandomNumber(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

function getItemExamples() {
  return ["waiting", "ready", "expires_soon", "on_hold"].map((state, index) => {
    return {
      data: getDataExample((index + 1).toString(), state),
      client_data: getClientDataExample(state),
      links: getLinksExample(),
    } as ApiListData<Reservation, ReservationClient>;
  });
}

function getDataExample(reservationId: string, state: ReservationState) {
  let readyInMins = getRandomNumber(5, 20);
  let readyAt = new Date(new Date(Date.now()).getTime() + readyInMins * 60000);

  let nextStateMins = getRandomNumber(1, 3);
  let nextStateAt = new Date(
    new Date(Date.now()).getTime() + nextStateMins * 60000
  );

  return {
    id: reservationId,
    attraction: "Batman",
    attractionId: "7189c412-4bc2-49d6-99ef-4ee06773ece8",
    guest_count: 3,
    ready_at: readyAt.toLocaleString(),
    ready_in_mins: readyInMins,
    state: state,
    next_state_at: nextStateAt.toLocaleString(),
    next_state_in_mins: nextStateMins,
  };
}

function getClientDataExample(state: ReservationState) {
  switch (state) {
    case "waiting":
      return {
        state_text: "Ready In",
        bannerColor: "#3894f4",
        detailsbgcolor: "#ffffff",
        state_description_text: "",
        state_description_text_2:
          "Once this reservation is ready you can use it whenever you like. It won't expire.",
        countdown_timer_seconds: getRandomNumber(100, 1000),
      };
    case "ready":
      return {
        state_text: "Ride Now",
        bannerColor: "#a8cc1c",
        detailsbgcolor: "#ffffff",
        state_description_text: "IT'S TIME TO RIDE!",
        state_description_text_2:
          "Follow The Signs At The Ride And Present This QR Code At The Reserve N Ride Entrance.",
        qrCode:
          "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAV4AAAFeAQAAAADlUEq3AAADE0lEQVR4Xu2ZMXbjMAxE4ZfCpY/go+ho0tF0FB/BpQs/YzEDyKaWVJKtd1BEAfnFYgQQIG3+e3va3yPfmODWBLcmuDXBrf0f8Mto4djVFwzfJj/543Kblnhw8kvwEMZ/vrzsHNSC8ZvN/jzfbVpeX4/LhggewKHltEBnA0xlHQJPHt7lZib4Wzgi9eJrROrZqXoE7DozUgX/AHvmMz2zoo50Flxw/EllQVHnWsGxwoYI7uGkXpCUOu8fnBQ8hN9GST8F+H5tJwW3k63OWUyuvpyesT96BewcAXvn/ih4BDuVnZHB0f0ZGhpsjI4HizNaQsEjOCj0eyd0MjajiqAqY4UpvsH5HamCxzAo6hyGoKzsZtyu/AaCexg7YkQjDxtRWqgsu+mk6MEEd3DpzAyGR2XR0CDXM7u7jyK4YOpcDU1RnpGaC+XXENzBiEZombFJSbMAowmMClOe4BEcVFQRvrNkpC7VwvDVMsEdXMqiptQjQjQjdYn34wSSiOAeNpQP9Hs4emQTOJfq+Q2aEBW8S9jYA43KIrvZwmAaxYQHXsHH8BMXK0vdSTWx6evMpVYeRAT3MOsGW+ULYtOrkzHozE4GVzCChzD+Q4+cOlc3/Q7RPMMJHsE0VN5HXufBy3cmR3ZHb/3RWfAeRjFBNOYDIzi1IbvTc8FjGFoin1FaUIdzY8zYpPhIecFDuH4322V3HkRS4FXwAQyDlpvA8Go8A7ZOIII7+IX7gK1VNvTPGITO23nEBB/AeTLLAgwQOqPtC9Xxs0Z4fEdwD2NjRDRiK5ypM3fEYDAN8bmE4AEMSeFUx4x3MHurK4NdTRG8h6klopFNIIpJ/SKEe4SKW8E9XMaqXIe3vOMLnfkNbH+xIPgNU0v0LtSZlEF1CJyv5mqCexgFgwdeTEcTGN00q8hHZ8FHMCikNfu9qilZo/kNsjMUfAzneAyEwFt2O8qx0xN8DEPL7Y7PELBX+PCyjRY8gDG4MDaR5CzOtUIleauz4AZGbBqnr7xtYWxGTSkvch1/Bffwb01wa4JbE9ya4NYEt/Zv8B9FHrJE9LM0FgAAAABJRU5ErkJggg==",
      };
    case "expires_soon":
      return {
        state_text: "Expires In",
        // bgcolor: "#55af51",
        bannerColor: "#ff843c",
        detailsbgcolor: "#ffffff",
        state_description_text: "IT'S TIME TO RIDE!",
        state_description_text_2:
          "Follow The Signs At The Ride And Present This QR Code At The Reserve N Ride Entrance.",
        qrCode:
          "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAV4AAAFeAQAAAADlUEq3AAADE0lEQVR4Xu2ZMXbjMAxE4ZfCpY/go+ho0tF0FB/BpQs/YzEDyKaWVJKtd1BEAfnFYgQQIG3+e3va3yPfmODWBLcmuDXBrf0f8Mto4djVFwzfJj/543Kblnhw8kvwEMZ/vrzsHNSC8ZvN/jzfbVpeX4/LhggewKHltEBnA0xlHQJPHt7lZib4Wzgi9eJrROrZqXoE7DozUgX/AHvmMz2zoo50Flxw/EllQVHnWsGxwoYI7uGkXpCUOu8fnBQ8hN9GST8F+H5tJwW3k63OWUyuvpyesT96BewcAXvn/ih4BDuVnZHB0f0ZGhpsjI4HizNaQsEjOCj0eyd0MjajiqAqY4UpvsH5HamCxzAo6hyGoKzsZtyu/AaCexg7YkQjDxtRWqgsu+mk6MEEd3DpzAyGR2XR0CDXM7u7jyK4YOpcDU1RnpGaC+XXENzBiEZombFJSbMAowmMClOe4BEcVFQRvrNkpC7VwvDVMsEdXMqiptQjQjQjdYn34wSSiOAeNpQP9Hs4emQTOJfq+Q2aEBW8S9jYA43KIrvZwmAaxYQHXsHH8BMXK0vdSTWx6evMpVYeRAT3MOsGW+ULYtOrkzHozE4GVzCChzD+Q4+cOlc3/Q7RPMMJHsE0VN5HXufBy3cmR3ZHb/3RWfAeRjFBNOYDIzi1IbvTc8FjGFoin1FaUIdzY8zYpPhIecFDuH4322V3HkRS4FXwAQyDlpvA8Go8A7ZOIII7+IX7gK1VNvTPGITO23nEBB/AeTLLAgwQOqPtC9Xxs0Z4fEdwD2NjRDRiK5ypM3fEYDAN8bmE4AEMSeFUx4x3MHurK4NdTRG8h6klopFNIIpJ/SKEe4SKW8E9XMaqXIe3vOMLnfkNbH+xIPgNU0v0LtSZlEF1CJyv5mqCexgFgwdeTEcTGN00q8hHZ8FHMCikNfu9qilZo/kNsjMUfAzneAyEwFt2O8qx0xN8DEPL7Y7PELBX+PCyjRY8gDG4MDaR5CzOtUIleauz4AZGbBqnr7xtYWxGTSkvch1/Bffwb01wa4JbE9ya4NYEt/Zv8B9FHrJE9LM0FgAAAABJRU5ErkJggg==",
        countdown_timer_seconds: getRandomNumber(100, 5000),
      };
    case "on_hold":
      return {
        state_text: "ON HOLD",
        bannerColor: "#ff843c",
        detailsbgcolor: "#ffffff",
        state_description_text: "",
        state_description_text_2:
          "The Ride is Currently Closed. When The Ride Reopens Your Wait Time Will Continue To Count Down.",
        countdown_timer_seconds: getRandomNumber(200, 1000),
      };
  }
  return {};
}

function getLinksExample() {
  return {
    self: getApiUrl("/reservations/c28c6acd-7e97-444c-9f74-9cc8c2ad17eb"),
    web: "https://xxx/#/reservations/c28c6acd-7e97-444c-9f74-9cc8c2ad17eb",
    attraction: getApiUrl("/attractions/b22b0d95-1401-4143-b171-01fff6094f1d"),
    attraction_thumb: getApiUrl(
      "/attractions/b22b0d95-1401-4143-b171-01fff6094f1d/thumb"
    ),
  };
}
