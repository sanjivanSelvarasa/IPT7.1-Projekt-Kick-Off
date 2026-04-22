use master;
go

if db_id('CreateYourselfDB') is null
begin
	create database CreateYourselfDB;
end
go

use CreateYourselfDB;
go

if object_id('dbo.Template', 'U') is null
begin
	create table Template(
	id int primary key identity,
	[name] nvarchar(50),
	description nvarchar(max),
	layout_type nvarchar(50),
	preview_img nvarchar(255),
	created_at datetime2,

	constraint UQ_Template_Name unique([name])
	);
end
go

if object_id('dbo.[User]', 'U') is null
begin
	create table [User](
	id int primary key identity,
	username nvarchar(50),
	email nvarchar(100),
	password_hash nvarchar(255),
	first_name nvarchar(50),
	last_name nvarchar(50),
	profile_img nvarchar(255),
	bio nvarchar(max),
	preferred_language nvarchar(10),
	created_at datetime2,
	updated_at datetime2,

	constraint UQ_User_Username unique(username),
	constraint UQ_User_Email unique(email)
	);
end
go

if object_id('dbo.Portfolio', 'U') is null
begin
	create table Portfolio(
	id int primary key identity,
	user_id int,
	template_id int,
	current_theme_id int,
	title nvarchar(100),
	description nvarchar(max),
	slug nvarchar(100),
	visibility nvarchar(20),
	is_published bit,
	published_at datetime2,
	current_version_id int,
	language_code nvarchar(10),
	created_at datetime2,
	updated_at datetime2,

	constraint UQ_Portfolio_Slug unique(slug),

	foreign key (user_id) references [User](id),
	foreign key (template_id) references Template(id)
	);
end
go

if object_id('dbo.Theme', 'U') is null
begin
	create table Theme(
id int primary key identity,
portfolio_id int,
primary_color nvarchar(20),
secondary_color nvarchar(20),
background_color nvarchar(20),
surface_color nvarchar(20),
text_color nvarchar(20),
accent_color nvarchar(20),
font_family nvarchar(100),
created_at datetime2,
updated_at datetime2,

foreign key (portfolio_id) references Portfolio(id)
	);
end
go

if object_id('dbo.PortfolioVersion', 'U') is null
begin
	create table PortfolioVersion(
id int primary key identity,
portfolio_id int,
version_number int,
title_snapshot nvarchar(100),
is_published bit,
created_at datetime2,

foreign key (portfolio_id) references Portfolio(id)
	);
end
go

if object_id('FK_Portfolio_CurrentTheme', 'F') is null
begin
    alter table Portfolio
    add constraint FK_Portfolio_CurrentTheme
    foreign key (current_theme_id) references Theme(id);
end
go

if object_id('FK_Portfolio_CurrentVersion', 'F') is null
begin
    alter table Portfolio
    add constraint FK_Portfolio_CurrentVersion
    foreign key (current_version_id) references PortfolioVersion(id);
end
go

if object_id('dbo.PortfolioSection', 'U') is null
begin
	create table PortfolioSection(
		id int primary key identity,
		portfolio_version_id int,
		section_type nvarchar(50),
		title nvarchar(100),
		sort_order int,
		is_visible bit,
		created_at datetime2,
		updated_at datetime2,

		foreign key (portfolio_version_id) references PortfolioVersion(id)
	);
end
go

if object_id('dbo.EditorBlock', 'U') is null
begin
	create table EditorBlock(
	id int primary key identity,
	section_id int,
block_type nvarchar(50),
content_json nvarchar(max),
sort_order int,
created_at datetime2,
updated_at datetime2,

foreign key (section_id) references PortfolioSection(id)
	);
end
go

if object_id('dbo.Media', 'U') is null
begin
	create table Media(
id int primary key identity,
user_id int,
portfolio_id int,
file_name nvarchar(255),
file_url nvarchar(255),
mime_type nvarchar(100),
file_size int,
alt_text nvarchar(255),
created_at datetime2,

foreign key (user_id) references [User](id),
foreign key (portfolio_id) references Portfolio(id)
	);
end
go

if object_id('dbo.Project', 'U') is null
begin
	create table Project(
	id int primary key identity,
	portfolio_id int,
	title nvarchar(100),
	description nvarchar(max),
	sort_order int,
	img_url nvarchar(255),
	project_url nvarchar(255),
	github_url nvarchar(255),
	[start_date] date,
	end_date date,
	created_at datetime2,
	updated_at datetime2,

	foreign key (portfolio_id) references Portfolio(id)
	);
end
go

if object_id('dbo.Skill', 'U') is null
begin
	create table Skill(
	id int primary key identity,
	[name] nvarchar(50),
	description nvarchar(max),
	created_at datetime2,

	constraint UQ_Skill_Name unique([name])
	);
end
go

if object_id('dbo.PortfolioSkill', 'U') is null
begin
	create table PortfolioSkill(
	id int primary key identity,
	portfolio_id int,
	skill_id int,
	[level] tinyint,
	sort_order int,
	created_at datetime2,

	foreign key (portfolio_id) references Portfolio(id),
	foreign key (skill_id) references Skill(id)
	);
end
go

if object_id('dbo.SocialLink', 'U') is null
begin
	create table SocialLink(
	id int primary key identity,
	portfolio_id int,
	[platform] nvarchar(50),
	[url] nvarchar(255),
	created_at datetime2,

	foreign key (portfolio_id) references Portfolio(id)
	);
end
go

if object_id('dbo.Experience', 'U') is null
begin
	create table Experience(
	id int primary key identity,
	portfolio_id int,
	company_name nvarchar(100),
	position nvarchar(100),
	sort_order int,
	description nvarchar(max),
	[start_date] date,
	end_date date,
	created_at datetime2,

	foreign key (portfolio_id) references Portfolio(id)
	);
end
go

if object_id('dbo.Education', 'U') is null
begin
	create table Education(
	id int primary key identity,
	portfolio_id int,
	institution_name nvarchar(100),
	degree nvarchar(100),
	field_of_study nvarchar(100),
	sort_order int,
	[start_date] date,
	end_date date,
	created_at datetime2,

	foreign key (portfolio_id) references Portfolio(id)
	);
end
go

if object_id('dbo.PortfolioTranslation', 'U') is null
begin
	create table PortfolioTranslation(
id int primary key identity,
portfolio_id int,
language_code nvarchar(10),
title nvarchar(100),
description nvarchar(max),
created_at datetime2,
updated_at datetime2,

foreign key (portfolio_id) references Portfolio(id)
	);
end
go

if object_id('dbo.UserRefreshToken', 'U') is null
begin
	create table UserRefreshToken(
	id int primary key identity,
	user_id int,
	token_hash nvarchar(2048),
	expires_at datetime2,
	revoked_at datetime2,
	created_at datetime2,

	constraint UQ_UserRefreshToken_TokenHash unique(token_hash),

	foreign key (user_id) references [User](id)
	);
end
go