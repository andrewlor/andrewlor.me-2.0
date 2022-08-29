const Airtable = require('airtable')
Airtable.configure({
    endpointUrl: 'https://api.airtable.com',
    apiKey: READ_ONLY_AIRTABLE_API_KEY,
})
const base = Airtable.base('appqaa5uqybbJXaak')

export const fetchProjects = async (searchTerm) => {
    const query =
        searchTerm && searchTerm.length > 0
            ? {
                  filterByFormula: `OR(
                        REGEX_MATCH(LOWER({name}), ".*${searchTerm.toLowerCase()}.*"),
                        REGEX_MATCH(LOWER({tags}), ".*${searchTerm.toLowerCase()}.*")
                    )`,
              }
            : {}
    query.sort = [
        { field: 'priority', direction: 'desc' },
        { field: 'demo', direction: 'desc' },
    ]

    const records = await base('projects').select(query).all()

    return records.map((record) => ({
        ...record._rawJson.fields,
        id: record._rawJson.id,
    }))
}
