import { ref, onMounted, onUnmounted } from 'vue'

export function useAudioPlayer(src: string, verses: any[]) {
  const audioRef = ref<HTMLAudioElement | null>(null)
  const isPlaying = ref(false)
  const currentTime = ref(0)
  const duration = ref(0)
  const currentVerseIndex = ref<number | null>(null)

  const setupAudio = () => {
    if (!audioRef.value) return

    const audio = audioRef.value

    const updateTime = () => {
      currentTime.value = audio.currentTime
      const verse = verses.find((v) => audio.currentTime >= v.start && audio.currentTime < v.end)
      currentVerseIndex.value = verse ? verse.index : null
    }

    const updateDuration = () => {
      duration.value = audio.duration
    }

    const handleEnded = () => {
      isPlaying.value = false
    }

    audio.addEventListener('timeupdate', updateTime)
    audio.addEventListener('loadedmetadata', updateDuration)
    audio.addEventListener('ended', handleEnded)

    onUnmounted(() => {
      audio.removeEventListener('timeupdate', updateTime)
      audio.removeEventListener('loadedmetadata', updateDuration)
      audio.removeEventListener('ended', handleEnded)
    })
  }

  const togglePlay = async () => {
    if (!audioRef.value) return

    if (audioRef.value.readyState < 4) {
      await new Promise<void>((resolve) => {
        const onReady = () => {
          audioRef.value?.removeEventListener('canplaythrough', onReady)
          resolve()
        }
        audioRef.value?.addEventListener('canplaythrough', onReady)
      })
    }

    if (isPlaying.value) {
      audioRef.value.pause()
      isPlaying.value = false
    } else {
      await audioRef.value.play()
      isPlaying.value = true
    }
  }

  const seekTo = (value: number) => {
    if (audioRef.value) {
      audioRef.value.currentTime = value
    }
  }

  onMounted(setupAudio)

  return {
    audioRef,
    isPlaying,
    currentTime,
    duration,
    currentVerseIndex,
    togglePlay,
    seekTo
  }
}
