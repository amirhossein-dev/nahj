import { defineStore } from 'pinia'
import { ref, Ref, watch } from 'vue'

type BlockType = {
  id: number
  arabic: string
  farsi: string
  farsiTitle?: string
  audio: {
    arabic: string
    farsi: string
  }
}

export const useAudioPlayerStore = defineStore('audioPlayer', () => {
  const audio: Ref<HTMLAudioElement | null> = ref(null)
  const currentSource: Ref<string> = ref('')
  const isPlaying = ref(false)
  const playbackSpeed = ref(1)
  const timer = ref<NodeJS.Timeout | null>(null)
  const duration = ref(0)
  const currentBlockId = ref<number | null>(null)
  const blockList = ref<BlockType[]>([])

  const getAudioSequence = (blocks: BlockType[], mode: 'farsi' | 'arabic' | 'combined'): string[] => {
    if (mode === 'farsi') return blocks.map((block) => block.audio.farsi)
    if (mode === 'arabic') return blocks.map((block) => block.audio.arabic)

    // حالت ترکیبی: اول عربی بعد فارسی هر بلاک
    return blocks.flatMap((block) => [block.audio.arabic, block.audio.farsi])
  }

  const playlist = ref<string[]>([])
  const currentTime = ref(0)

  const setPlaylist = (list: string[], blocks: BlockType[]) => {
    playlist.value = list
    blockList.value = blocks
    currentIndex.value = 0
    if (list.length > 0) {
      setupAudio(list[0])
    }
  }

  watch(isPlaying, (val) => {
    if (val) {
      const interval = setInterval(updateTime, 500)
      audio.value?.addEventListener('pause', () => clearInterval(interval))
      audio.value?.addEventListener('ended', () => clearInterval(interval))
    }
  })

  const updateTime = () => {
    if (audio.value) {
      currentTime.value = audio.value.currentTime
    }
  }

  const currentLanguage = ref<'arabic' | 'farsi' | null>(null)

  const setupAudio = (src: string) => {
    if (audio.value) {
      audio.value.pause()
      audio.value = null
    }

    audio.value = new Audio(src)
    audio.value.load()
    audio.value.playbackRate = playbackSpeed.value
    currentSource.value = src
    isPlaying.value = false

    duration.value = 0

    const block = blockList.value.find((b) => b.audio.arabic === src || b.audio.farsi === src)
    currentBlockId.value = block?.id ?? null

    if (block) {
      currentBlockId.value = block.id
      currentLanguage.value = block.audio.arabic === src ? 'arabic' : 'farsi'
    } else {
      currentBlockId.value = null
      currentLanguage.value = null
    }

    audio.value.addEventListener('loadedmetadata', () => {
      if (audio.value?.duration && isFinite(audio.value.duration)) {
        duration.value = audio.value.duration
      }
    })

    audio.value.addEventListener('ended', handleEnded)
  }
  const currentIndex = ref(0)
  const handleEnded = () => {
    isPlaying.value = false

    if (currentIndex.value + 1 < playlist.value.length) {
      currentIndex.value++
      setupAudio(playlist.value[currentIndex.value])
      play()
    }
  }

  const play = () => {
    if (!audio.value) return
    audio.value
      .play()
      .then(() => {
        isPlaying.value = true
      })
      .catch((e) => {
        console.error('Error playing audio:', e)
      })
  }

  const pause = () => {
    if (!audio.value) return
    audio.value.pause()
    isPlaying.value = false
  }

  const toggle = () => {
    if (!audio.value) return
    isPlaying.value ? pause() : play()
  }

  const stop = () => {
    if (!audio.value) return
    audio.value.pause()
    audio.value.currentTime = 0
    isPlaying.value = false
  }

  const setSpeed = (speed: number) => {
    playbackSpeed.value = speed
    if (audio.value) {
      audio.value.playbackRate = speed
    }
  }
  const seek = (time: number) => {
    if (audio.value) {
      audio.value.currentTime = time
    }
  }

  const setTimer = (minutes: number) => {
    if (timer.value) clearTimeout(timer.value)
    if (minutes > 0) {
      timer.value = setTimeout(
        () => {
          stop()
        },
        minutes * 60 * 1000
      )
    }
  }

  return {
    audio,
    currentSource,
    isPlaying,
    playbackSpeed,
    currentTime,
    currentBlockId,
    currentLanguage,
    duration,
    setupAudio,
    play,
    pause,
    toggle,
    stop,
    setSpeed,
    setTimer,
    getAudioSequence,
    setPlaylist,
    seek
  }
})
