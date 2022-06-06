<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import Navbar from "../../components/Navbar/index.vue";
import Modal from "../../components/Modal/index.vue";
import Swal from "sweetalert2";
import { supabase } from "../../supabase";

const countDown = new Date("June 16, 2022 11:10:00").getTime();
const hari = ref();
const jam = ref();
const menit = ref();
const detik = ref();
const isTimeExpired = ref(false);

const isModalShow = ref(false);
const showModalExpired = () => {
  Swal.fire("Pemberitahuan", "Mohon maaf pendaftaran sudah ditutup", "warning");
};

const showModal = () => {
  isModalShow.value = true;
};

const clearForm = () => {
  fullName.value = "";
  email.value = "";
  phoneNumber.value = "";
  studentId.value = "";
  gradeNumber.value = "";
  gender.value = "";
};

const closeModal = () => {
  clearForm();
  isModalShow.value = false;
};

const isValid = computed(
  () =>
    fullName.value.length > 0 &&
    email.value.length > 0 &&
    phoneNumber.value != null &&
    studentId.value != null &&
    gradeNumber.value.length > 0 &&
    gender.value.length > 0
);

const fullName = ref("");
const email = ref("");
const phoneNumber = ref("");
const studentId = ref("");
const gradeNumber = ref("");
const gender = ref("");

const addPeserta = async () => {
  try {
    const { error } = await supabase.from("pendaftar").insert([
      {
        fullName: fullName.value,
        email: email.value,
        phoneNumber: phoneNumber.value,
        studentId: studentId.value,
        gradeNumber: gradeNumber.value,
        gender: gender.value,
      },
    ]);
    if (error) throw error;
    Swal.fire(
      "Selamat!",
      "Selamat Anda Telah terdaftar di ICC 2022",
      "success"
    );
    closeModal();
  } catch (error: any) {
    console.log(error);
    Swal.fire("Error :(", `${error.message}`, "error");
  }
};

const count = () => {
  const now = new Date().getTime();
  const distance = countDown - now;
  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);
  hari.value = days;
  jam.value = hours;
  menit.value = minutes;
  detik.value = seconds;

  if (distance < 0) {
    isTimeExpired.value = true;
  }
};

setInterval(count, 1000);
</script>

<template>
  <Navbar />
  <Modal
    v-if="isModalShow"
    @cancel="closeModal"
    @submit="addPeserta"
    :is-valid="isValid"
    title=""
    button-color="bg-blue-500"
    cancel-text="Batal"
    submit-text="Simpan"
  >
    <form @submit.prevent="addPeserta" class="w-full max-w-lg">
      <div class="flex flex-wrap -mx-3 mb-6">
        <div class="w-full px-3">
          <label
            class="flex justify-start text-gray-700 text-xs font-bold mb-2"
            for="fullName"
          >
            Nama Lengkap
          </label>
          <input
            v-model="fullName"
            class="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
            id="fullName"
            type="text"
            placeholder="Masukkan Nama Anda"
          />
        </div>
        <div class="w-full px-3">
          <label
            class="flex justify-start text-gray-700 text-xs font-bold mb-2"
            for="email"
          >
            Alamat Email
          </label>
          <input
            v-model="email"
            class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            id="email"
            type="email"
            placeholder="Masukkan Email Anda"
          />
        </div>
      </div>
      <div class="flex flex-wrap -mx-3 mb-6">
        <div class="w-full px-3">
          <label
            class="flex justify-start text-gray-700 text-xs font-bold mb-2"
            for="phoneNumber"
          >
            Nomor Telepon (Whatsapp)
          </label>
          <input
            v-model="phoneNumber"
            class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            id="phoneNumber"
            type="number"
            placeholder="Masukkan Nomor Telepon Anda"
          />
          <p class="text-gray-600 text-xs italic">
            Mohon masukkan nomor yang valid dan selalu aktif!
          </p>
        </div>
      </div>
      <div class="flex flex-wrap -mx-3 mb-6">
        <div class="w-full px-3">
          <label
            class="flex justify-start text-gray-700 text-xs font-bold mb-2"
            for="studentId"
          >
            Nomor Induk Mahasiswa
          </label>
          <input
            v-model="studentId"
            class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            id="studentId"
            type="number"
            placeholder="Masukkan NIM Anda"
          />
        </div>
      </div>

      <div class="flex flex-wrap -mx-3 mb-6">
        <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
          <label
            class="flex justify-start text-gray-700 text-xs font-bold mb-2"
            for="gradeNumber"
          >
            Kelas
          </label>
          <div class="relative flex justify-start">
            <select
              v-model="gradeNumber"
              class="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="gradeNumber"
            >
              <option selected disabled>Silahkan Pilih</option>
              <option>A1</option>
              <option>A2</option>
              <option>A3</option>
              <option>A4</option>
              <option>A5</option>
            </select>
            <div
              class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700"
            >
              <svg
                class="fill-current h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path
                  d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"
                />
              </svg>
            </div>
          </div>
        </div>
        <div class="w-full md:w-1/2 px-3">
          <label
            class="flex justify-start text-gray-700 text-xs font-bold mb-2"
            for="gender"
          >
            Jenis Kelamin
          </label>
          <div class="relative flex justify-start">
            <select
              v-model="gender"
              class="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="gender"
            >
              <option selected disabled>Silahkan Pilih</option>
              <option>Laki-laki</option>
              <option>Perempuan</option>
            </select>
            <div
              class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700"
            >
              <svg
                class="fill-current h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path
                  d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </form>
  </Modal>
  <div
    class="flex h-screen bg-[#e5e5e5] items-center justify-center w-full px-5 md:flex-row flex-col mx-auto"
  >
    <div
      class="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col mb-16 md:mb-0 items-center text-center"
    >
      <h1 class="title-font sm:text-6xl text-3xl mb-4 font-bold text-black">
        INFORMATICS CODING CAMP
      </h1>

      <div class="flex gap-5">
        <div>
          <span class="countdown sm:text-6xl text-3xl">
            <span>{{ hari }}</span>
          </span>
          days
        </div>
        <div>
          <span class="countdown sm:text-6xl text-3xl">
            <span>{{ jam }}</span>
          </span>
          hours
        </div>
        <div>
          <span class="countdown sm:text-6xl text-3xl">
            <span>{{ menit }}</span>
          </span>
          min
        </div>
        <div>
          <span class="countdown sm:text-6xl text-3xl">
            <span>{{ detik }}</span>
          </span>
          sec
        </div>
      </div>

      <div class="pt-7 flex justify-center">
        <button
          @click="showModal"
          class="inline-flex text-[#fca311] bg-[#14213d] border-0 py-2 px-6 focus:outline-none hover:bg-[#23386e] rounded text-lg"
        >
          Daftar
        </button>
      </div>
    </div>
  </div>
</template>
