[module mysql('http://com.genmymodel.rds.core/1.0')/]

[template public generate(db : Database)]
[comment @main/]
[file (db.name + '.mysql', false, 'UTF-8')]
[if (db.getDoc() <> null and db.getDoc() <> '')]
# [db.getDoc().replaceAll('\n', '\n#')/]

[/if]
# Create schemas
[for (g : Group | db.elements->filter(Group))]
[g.genGroup()/]
[/for]

# Create tables
[for (t : Table | db.eAllContents(Table))]
[t.genTable()/]
[/for]

# Create FKs
[for (r : Reference | db.eAllContents(Reference))]
[r.genFKs()/]
[/for]

# Create Indexes
[for (index : Index | db.eAllContents(Index))]
[index.genIndexes()/]
[/for]

[/file]
[/template]


[template public genGroup(g : Group)]
CREATE SCHEMA IF NOT EXISTS [g.qualName()/];
[for (g.elements->filter(Group))]
[self.genGroup()/][/for]
[/template]


[template public genTable(t : Table)]
[if (t.getDoc() <> null and t.getDoc() <> '')]
# [t.getDoc()/]
[/if]
CREATE TABLE IF NOT EXISTS [t.qualName().normalize()/]
(
    [for (t.columns) separator (',\n') after(if (t.columns->notEmpty() and t.columns->select(PK)->notEmpty()) then ',\n' else '' endif)]
    [self.genCols()/][/for]
    [if (t.columns->select(PK)->notEmpty())]PRIMARY KEY([t.columns->select(PK).name->sep(', ')/])[/if]
);

[/template]

[template public genIndexes(i : Index)]
CREATE INDEX [i.name.normalize()/] ON [i.eContainer(Table).qualName().normalize()/][i.genIndexColumns()/];
[/template]

[template public genIndexColumns(i : Index) ? (i.indexColumns->notEmpty())]
 [i.indexColumns.column.name.normalize()->sep('(', ', ', ')')/]
[/template]


[template public genFKs(r : Reference)]
ALTER TABLE [r.foreignKeyColumns->at(1).table.qualName()/]
    ADD[if (r.name <> null and r.name <> '')] CONSTRAINT FK_[r.name/]
    [/if]
    FOREIGN KEY ([r.foreignKeyColumns.name.normalize()->sep(',')/])
    REFERENCES [r.primaryKeyColumns->at(1).table.qualName()/]([r.primaryKeyColumns.name.normalize()->sep(',')/])
    [if (r.onDelete <> ReferenceActionType::NO_ACTION)]
    ON DELETE [r.onDelete.toString().replace('_',' ')/]
    [/if]
    [if (r.onUpdate <> ReferenceActionType::NO_ACTION)]
    ON UPDATE [r.onUpdate.toString().replace('_',' ')/]
    [/if]
;
    
[/template]

[**
 * One line of the death 
 */]
[template public genCols(c : Column) post(trim())]
[c.name.normalize()/] [c.type.genType()/][c.genSize()/][if (c.defaultValue <> null)] DEFAULT [c.genDValue()/][/if][if (not c.nullable or PK)] NOT NULL[/if][if (c.unique)] UNIQUE[/if]
[if (c.checkValue <> null)]    CHECK ([c.checkValue/])[/if]
[/template]


[template public genType(t : Type) ? (name.isValid()) post(trim())]
[if (t.name = 'VARBINARY')]LONGBLOB
[elseif (t.name = 'NUMERIC')]DECIMAL
[elseif (t.name = 'INTEGER')]INT
[elseif (t.name = 'BOOLEAN')]TINYINT(1)
[elseif (t.name = 'TIMESTAMP')]DATETIME
[elseif (t.name = 'text')]LONGTEXT
[elseif (t.name = 'XML')]LONGTEXT
[else][t.name/]
[/if]
[/template]


[template public genDValue(c : Column) ? (c.type.name.isValid()) post(trim())]
[if (c.type.name = 'VARCHAR' or c.type.name = 'CHARACTER')]'[c.defaultValue/]'
[else][c.defaultValue/]
[/if]
[/template]


[comment ugly as f***/]
[template public genSize(t : Column) ? (t.type.hasSize or t.type.hasScale)]
([if (t.type.hasSize)][t.size/][/if][if (t.type.hasSize and t.type.hasScale)], [/if][if (t.type.hasScale)][t.scale/][/if])
[/template]


[query public getDoc(a : ModelElement) : String =
    if (a.getEAnnotation('genmymodel') = null
        or not a.getEAnnotation('genmymodel').details->exists(key = 'gmm-description')) then
        null
    else
        a.getEAnnotation('genmymodel').details->select(key = 'gmm-description')->first().value.replaceAll('\n', '\n#')
    endif
/]


[query public isValid(s : String) : Boolean =
    s <> null and s <> ''
/]


[query public normalize(s : String) : String =
    if (s.contains(' ')) then '`' + s + '`' else s endif
/]


[query public qualName(m : ModelElement) : Sequence(String) = 
    m.ancestors(ModelElement)
        ->reject(oclIsKindOf(Database))
        ->reverse()
        .name.normalize()->including(m.name.normalize())->sep('.')
/]
