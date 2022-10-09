export default ({ app }, inject) => {
  const getSeasons = async () => {
    const snapshot = await app.$fire.database.ref('lol/seasons').get()
    if (snapshot.val()) {
      const mapped = Object.values(snapshot.val()).map((a) => {
        return {
          id: a.id,
          name: a.name,
          participants: a.participants,
          matches: a.matches
        }
      })
      return mapped
    }
    return []
  }

  const addSeason = (newSeason) => {
    const newSeasonRef = app.$fire.database.ref('lol/seasons').push()
    newSeason.id = newSeasonRef.key
    newSeasonRef.set(newSeason)
    return newSeason.id
  }

  const addMatch = (match, selectedSeasonId) => {
    const newMatchRef = app.$fire.database.ref(`lol/seasons/${selectedSeasonId}/matches`).push()
    match.id = newMatchRef.key
    newMatchRef.set(match)
  }

  const getParticipants = async () => {
    const snapshot = await app.$fire.database.ref('lol/participants').get()
    if (snapshot.val() != null) {
      return Object.values(snapshot.val())
    }
    return []
  }

  const addParticipant = (name) => {
    const newParticipantRef = app.$fire.database.ref('lol/participants').push()
    newParticipantRef.set({
      id: newParticipantRef.key,
      name
    })
  }

  const refreshChampions = async () => {
    const championDataRef = app.$fire.database.ref('lol/champions').push()
    await fetch('http://ddragon.leagueoflegends.com/cdn/12.6.1/data/en_US/champion.json')
      .then(res => res.json())
      .then(res => championDataRef.set(res.data))
  }

  inject('database', {
    getSeasons,
    addSeason,
    addMatch,
    getParticipants,
    addParticipant,
    refreshChampions
  })
}
