/* eslint-disable */
import { getLocale, experimentalStaticLocale } from "../runtime.js"

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Common_BackInputs */
/** @typedef {{}} Common_NextInputs */
/** @typedef {{}} Common_CancelInputs */
/** @typedef {{}} Common_SaveInputs */
/** @typedef {{}} Common_DeleteInputs */
/** @typedef {{}} Common_RetryInputs */
/** @typedef {{}} Common_ResumeInputs */
/** @typedef {{}} Common_PauseInputs */
/** @typedef {{}} Common_PrevInputs */
/** @typedef {{}} Common_ClearInputs */
/** @typedef {{}} Common_DismissInputs */
/** @typedef {{}} Common_BrowseInputs */
/** @typedef {{}} Common_LoadingInputs */
/** @typedef {{}} Common_SavedInputs */
/** @typedef {{}} Common_SavingInputs */
/** @typedef {{}} Common_DeletingInputs */
/** @typedef {{}} Common_TestingInputs */
/** @typedef {{}} Common_Closedetails1Inputs */
/** @typedef {{ key: NonNullable<unknown> }} Common_Couldnotload2Inputs */
/** @typedef {{ key: NonNullable<unknown> }} Common_Couldnotsave2Inputs */
/** @typedef {{}} Common_Retryfailures1Inputs */
/** @typedef {{}} Nav_ImportInputs */
/** @typedef {{}} Nav_RecipientsInputs */
/** @typedef {{}} Nav_TemplatesInputs */
/** @typedef {{}} Nav_ComposeInputs */
/** @typedef {{}} Nav_LogsInputs */
/** @typedef {{}} Nav_SettingsInputs */
/** @typedef {{}} App_Backendunreachable1Inputs */
/** @typedef {{}} Welcome_TitleInputs */
/** @typedef {{}} Welcome_SubtitleInputs */
/** @typedef {{}} Welcome_Checkinglibreoffice2Inputs */
/** @typedef {{}} Welcome_Libreofficepurpose2Inputs */
/** @typedef {{}} Welcome_Libreofficefound2Inputs */
/** @typedef {{}} Welcome_Libreofficemissing2Inputs */
/** @typedef {{}} Welcome_Libreofficemissingdetail3Inputs */
/** @typedef {{}} Welcome_Installwith1Inputs */
/** @typedef {{}} Welcome_Downloadfrom1Inputs */
/** @typedef {{}} Welcome_Checkagain1Inputs */
/** @typedef {{}} Welcome_Templatesfolder1Inputs */
/** @typedef {{}} Welcome_Outputfolder1Inputs */
/** @typedef {{}} Welcome_Settingup1Inputs */
/** @typedef {{}} Welcome_Getstarted1Inputs */
/** @typedef {{}} Status_PendingInputs */
/** @typedef {{}} Status_SendingInputs */
/** @typedef {{}} Status_PausedInputs */
/** @typedef {{}} Status_CompletedInputs */
/** @typedef {{}} Status_CancelledInputs */
/** @typedef {{}} Status_FailedInputs */
/** @typedef {{}} Status_SkippedInputs */
/** @typedef {{}} Status_SentInputs */
/** @typedef {{}} Settingspage_Title1Inputs */
/** @typedef {{}} Settingspage_Description1Inputs */
/** @typedef {{}} Settingspage_Ratelimiting2Inputs */
/** @typedef {{}} Settingspage_Ratelimitingdescription3Inputs */
/** @typedef {{ ms: NonNullable<unknown> }} Settingspage_Msperemail3Inputs */
/** @typedef {{}} Settingspage_Delaybetweenemails3Inputs */
/** @typedef {{}} Settingspage_Defaultfolders2Inputs */
/** @typedef {{}} Settingspage_Defaultfoldersdescription3Inputs */
/** @typedef {{}} Settingspage_Templatesfolder2Inputs */
/** @typedef {{}} Settingspage_Outputfolder2Inputs */
/** @typedef {{}} Settingspage_About1Inputs */
/** @typedef {{}} Settingspage_App1Inputs */
/** @typedef {{}} Settingspage_Version1Inputs */
/** @typedef {{}} Settingspage_Data1Inputs */
/** @typedef {{}} Settingspage_Storedlocally2Inputs */
/** @typedef {{}} Settingspage_Language1Inputs */
/** @typedef {{}} Settingspage_Languagedescription2Inputs */
/** @typedef {{ rate: NonNullable<unknown> }} Settingspage_Ratepersecondone4Inputs */
/** @typedef {{ rate: NonNullable<unknown> }} Settingspage_Ratepersecondother4Inputs */
/** @typedef {{}} Settingspage_Couldnotload3Inputs */
/** @typedef {{}} Smtp_TitleInputs */
/** @typedef {{}} Smtp_DescriptionInputs */
/** @typedef {{}} Smtp_Addprofile1Inputs */
/** @typedef {{ name: NonNullable<unknown> }} Smtp_Profilesaved1Inputs */
/** @typedef {{}} Smtp_Profiledeleted1Inputs */
/** @typedef {{}} Smtp_Couldnotsaveprofile3Inputs */
/** @typedef {{}} Smtp_Couldnotdeleteprofile3Inputs */
/** @typedef {{}} Smtp_Couldnotloadprofiles3Inputs */
/** @typedef {{}} Smtp_Loadingprofiles1Inputs */
/** @typedef {{}} Smtp_Noprofilesyet2Inputs */
/** @typedef {{}} Smtp_Noprofilesdescription2Inputs */
/** @typedef {{}} Smtp_Testconnection1Inputs */
/** @typedef {{}} Smtp_Connectionok1Inputs */
/** @typedef {{}} Smtp_ConnectedInputs */
/** @typedef {{}} Smtp_Connectionfailed1Inputs */
/** @typedef {{}} Smtp_Passwordnotset2Inputs */
/** @typedef {{}} Smtp_Addprofiletitle2Inputs */
/** @typedef {{ name: NonNullable<unknown> }} Smtp_Editprofiletitle2Inputs */
/** @typedef {{}} Smtp_Createhint1Inputs */
/** @typedef {{}} Smtp_Edithint1Inputs */
/** @typedef {{}} Smtp_Profilename1Inputs */
/** @typedef {{}} Smtp_Smtphost1Inputs */
/** @typedef {{}} Smtp_PortInputs */
/** @typedef {{}} Smtp_Implicittls1Inputs */
/** @typedef {{}} Smtp_StarttlsInputs */
/** @typedef {{}} Smtp_UsernameInputs */
/** @typedef {{}} Smtp_Apppassword1Inputs */
/** @typedef {{}} Smtp_Leaveblanktokeep3Inputs */
/** @typedef {{}} Smtp_Gmailapppasswordhint3Inputs */
/** @typedef {{}} Smtp_Saveprofile1Inputs */
/** @typedef {{}} Smtp_Savechanges1Inputs */
/** @typedef {{ name: NonNullable<unknown> }} Smtp_Deleteprofiletitle2Inputs */
/** @typedef {{}} Smtp_Deleteprofiledescription2Inputs */
/** @typedef {{}} Smtp_Passwordlabel1Inputs */
/** @typedef {{}} Compose_TitleInputs */
/** @typedef {{}} Compose_DescriptionInputs */
/** @typedef {{}} Compose_Steprecipients1Inputs */
/** @typedef {{}} Compose_Steptemplate1Inputs */
/** @typedef {{}} Compose_Stepmessage1Inputs */
/** @typedef {{}} Compose_Stepsmtp1Inputs */
/** @typedef {{}} Compose_Stepgenerate1Inputs */
/** @typedef {{}} Compose_Stepsend1Inputs */
/** @typedef {{ count: NonNullable<unknown> }} Compose_Datacoversallslots3Inputs */
/** @typedef {{ slot: NonNullable<unknown> }} Compose_Unknownslotfooter2Inputs */
/** @typedef {{}} Compose_Writesubjecttocontinue3Inputs */
/** @typedef {{}} Compose_Writebodytocontinue3Inputs */
/** @typedef {{}} Compose_Messagelooksgood2Inputs */
/** @typedef {{}} Compose_Connectiondetailsready2Inputs */
/** @typedef {{}} Compose_Completesmtpdetails2Inputs */
/** @typedef {{ generated: NonNullable<unknown>, failed: NonNullable<unknown> }} Compose_Generatedfailedfooter2Inputs */
/** @typedef {{}} Compose_Prefillreenterpassword2Inputs */
/** @typedef {{}} Compose_Searchrecipients1Inputs */
/** @typedef {{}} Compose_Searchplaceholder1Inputs */
/** @typedef {{}} Compose_Filterbybatch2Inputs */
/** @typedef {{}} Compose_Allbatches1Inputs */
/** @typedef {{ count: NonNullable<unknown>, stamp: NonNullable<unknown> }} Compose_Batchoption1Inputs */
/** @typedef {{ total: NonNullable<unknown> }} Compose_Selectallmatchingtitle3Inputs */
/** @typedef {{ total: NonNullable<unknown> }} Compose_Selectallcount2Inputs */
/** @typedef {{}} Compose_Couldnotloadrecipients3Inputs */
/** @typedef {{}} Compose_Norecipientsyet2Inputs */
/** @typedef {{}} Compose_Norecipientsmatchfilter3Inputs */
/** @typedef {{}} Compose_Norecipientshint2Inputs */
/** @typedef {{}} Compose_Gotoimport2Inputs */
/** @typedef {{}} Compose_Trydifferentfilter2Inputs */
/** @typedef {{}} Compose_Selectallonpage3Inputs */
/** @typedef {{}} Compose_NameInputs */
/** @typedef {{}} Compose_EmailInputs */
/** @typedef {{}} Compose_PhoneInputs */
/** @typedef {{ name: NonNullable<unknown> }} Compose_Selectrecipient1Inputs */
/** @typedef {{ selected: NonNullable<unknown>, total: NonNullable<unknown> }} Compose_Selectioncount1Inputs */
/** @typedef {{ page: NonNullable<unknown>, total: NonNullable<unknown> }} Compose_Pageof1Inputs */
/** @typedef {{}} Compose_Templatelabel1Inputs */
/** @typedef {{}} Compose_Choosetemplate1Inputs */
/** @typedef {{}} Compose_Notemplatesregistered2Inputs */
/** @typedef {{}} Compose_Registertemplatelink2Inputs */
/** @typedef {{}} Compose_Notemplatesregisteredhint3Inputs */
/** @typedef {{}} Compose_Requiredslots1Inputs */
/** @typedef {{}} Compose_Outputpattern1Inputs */
/** @typedef {{ count: NonNullable<unknown> }} Compose_Allcovered1Inputs */
/** @typedef {{ missing: NonNullable<unknown>, count: NonNullable<unknown> }} Compose_Missingdatasummary2Inputs */
/** @typedef {{}} Compose_Missingdatahint2Inputs */
/** @typedef {{}} Compose_SubjectInputs */
/** @typedef {{ name: NonNullable<unknown>, instansi: NonNullable<unknown> }} Compose_Subjectplaceholder1Inputs */
/** @typedef {{}} Compose_Bodylabel1Inputs */
/** @typedef {{ name: NonNullable<unknown> }} Compose_Bodyplaceholder1Inputs */
/** @typedef {{}} Compose_Unknownslothint2Inputs */
/** @typedef {{ list: NonNullable<unknown> }} Compose_Missingslottitle2Inputs */
/** @typedef {{}} Compose_Missingslothint2Inputs */
/** @typedef {{}} Compose_Livepreview1Inputs */
/** @typedef {{ name: NonNullable<unknown> }} Compose_Previewfor1Inputs */
/** @typedef {{}} Compose_Emailconnection1Inputs */
/** @typedef {{}} Compose_Savedprofile1Inputs */
/** @typedef {{}} Compose_Enterdetails1Inputs */
/** @typedef {{}} Compose_Chooseprofile1Inputs */
/** @typedef {{}} Compose_Nosavedprofileshint3Inputs */
/** @typedef {{}} Compose_Settingslink1Inputs */
/** @typedef {{}} Compose_HostInputs */
/** @typedef {{}} Compose_Portlabel1Inputs */
/** @typedef {{}} Compose_Usernamelabel1Inputs */
/** @typedef {{}} Compose_Apppasswordlabel2Inputs */
/** @typedef {{}} Compose_Saveasprofile2Inputs */
/** @typedef {{}} Compose_Profilenameplaceholder2Inputs */
/** @typedef {{}} Compose_Testconnectionbutton2Inputs */
/** @typedef {{}} Compose_Senderidentity1Inputs */
/** @typedef {{}} Compose_Sendername1Inputs */
/** @typedef {{}} Compose_Senderaddress1Inputs */
/** @typedef {{}} Compose_Sendingrate1Inputs */
/** @typedef {{ ms: NonNullable<unknown> }} Compose_Sendingratems2Inputs */
/** @typedef {{}} Compose_Sendingratehint2Inputs */
/** @typedef {{}} Compose_Generationfailed1Inputs */
/** @typedef {{}} Compose_Connectionfailed1Inputs */
/** @typedef {{}} Compose_Choosetemplatefirst2Inputs */
/** @typedef {{}} Compose_Campaignsummary1Inputs */
/** @typedef {{}} Compose_RecipientsInputs */
/** @typedef {{}} Compose_TemplateInputs */
/** @typedef {{}} Compose_Outputfolder1Inputs */
/** @typedef {{}} Compose_Campaignsummaryhint2Inputs */
/** @typedef {{}} Compose_Generatepdfs1Inputs */
/** @typedef {{}} Compose_GeneratingInputs */
/** @typedef {{ current: NonNullable<unknown>, total: NonNullable<unknown> }} Compose_Oftotal1Inputs */
/** @typedef {{ generated: NonNullable<unknown>, failed: NonNullable<unknown>, pending: NonNullable<unknown> }} Compose_Generatedcounts1Inputs */
/** @typedef {{}} Compose_Tryagain1Inputs */
/** @typedef {{ count: NonNullable<unknown> }} Compose_Allgenerated1Inputs */
/** @typedef {{ generated: NonNullable<unknown>, failed: NonNullable<unknown> }} Compose_Generatedwithfailures2Inputs */
/** @typedef {{ count: NonNullable<unknown> }} Compose_Failedrecipientstitle2Inputs */
/** @typedef {{}} Compose_Spotcheck1Inputs */
/** @typedef {{ index: NonNullable<unknown>, total: NonNullable<unknown> }} Compose_Spotindex1Inputs */
/** @typedef {{}} Compose_Loadingpreview1Inputs */
/** @typedef {{}} Compose_Sendsummary1Inputs */
/** @typedef {{}} Compose_SenderInputs */
/** @typedef {{}} Compose_ConnectionInputs */
/** @typedef {{}} Compose_PacingInputs */
/** @typedef {{}} Compose_AttachmentsInputs */
/** @typedef {{ count: NonNullable<unknown> }} Compose_Generatedpdfscount2Inputs */
/** @typedef {{}} Compose_Preflighthint1Inputs */
/** @typedef {{}} Compose_Nogeneratedattachments2Inputs */
/** @typedef {{}} Compose_Preparingsend1Inputs */
/** @typedef {{}} Compose_SendingInputs */
/** @typedef {{ sent: NonNullable<unknown>, failed: NonNullable<unknown>, pending: NonNullable<unknown> }} Compose_Sendcounts1Inputs */
/** @typedef {{}} Compose_Windingdowntitle2Inputs */
/** @typedef {{ current: NonNullable<unknown>, total: NonNullable<unknown> }} Compose_Cancelsendconfirm2Inputs */
/** @typedef {{}} Compose_Perrecipientlog2Inputs */
/** @typedef {{}} Compose_Waitingfirstemail2Inputs */
/** @typedef {{ count: NonNullable<unknown> }} Compose_Allemailssent2Inputs */
/** @typedef {{ sent: NonNullable<unknown>, failed: NonNullable<unknown> }} Compose_Sentwithfailures2Inputs */
/** @typedef {{}} Compose_Sendcancelled1Inputs */
/** @typedef {{ sent: NonNullable<unknown>, skipped: NonNullable<unknown> }} Compose_Cancelleddetail1Inputs */
/** @typedef {{}} Compose_RecipientInputs */
/** @typedef {{}} Compose_Rowskipped1Inputs */
/** @typedef {{}} Compose_Sendingfailed1Inputs */
/** @typedef {{}} Compose_Couldnotstartsend3Inputs */
/** @typedef {{}} Compose_Couldnotpausesend3Inputs */
/** @typedef {{}} Compose_Couldnotcancelsend3Inputs */
/** @typedef {{}} Compose_Couldnotretryfailures3Inputs */
/** @typedef {{}} Compose_Sendjobnolongerexists4Inputs */
/** @typedef {{}} Compose_Couldnotresumesend3Inputs */
/** @typedef {{ count: NonNullable<unknown> }} Compose_Recipientsselectedone2Inputs */
/** @typedef {{ count: NonNullable<unknown> }} Compose_Recipientsselectedother2Inputs */
/** @typedef {{ count: NonNullable<unknown> }} Compose_Prefillretryone2Inputs */
/** @typedef {{ count: NonNullable<unknown> }} Compose_Prefillretryother2Inputs */
/** @typedef {{ count: NonNullable<unknown> }} Compose_Prefilldeletedone2Inputs */
/** @typedef {{ count: NonNullable<unknown> }} Compose_Prefilldeletedother2Inputs */
/** @typedef {{ slot: NonNullable<unknown>, count: NonNullable<unknown> }} Compose_Slotmissingcountone3Inputs */
/** @typedef {{ slot: NonNullable<unknown>, count: NonNullable<unknown> }} Compose_Slotmissingcountother3Inputs */
/** @typedef {{ list: NonNullable<unknown> }} Compose_Unknownslottitleone3Inputs */
/** @typedef {{ list: NonNullable<unknown> }} Compose_Unknownslottitleother3Inputs */
/** @typedef {{ count: NonNullable<unknown> }} Compose_Livepreviewhintone3Inputs */
/** @typedef {{ count: NonNullable<unknown> }} Compose_Livepreviewhintother3Inputs */
/** @typedef {{ count: NonNullable<unknown> }} Compose_Sendcountone2Inputs */
/** @typedef {{ count: NonNullable<unknown> }} Compose_Sendcountother2Inputs */
/** @typedef {{}} Compose_Apppasswordplaceholder2Inputs */
/** @typedef {{}} Templates_TitleInputs */
/** @typedef {{}} Templates_Addtemplate1Inputs */
/** @typedef {{ name: NonNullable<unknown> }} Templates_Templateregistered1Inputs */
/** @typedef {{ name: NonNullable<unknown> }} Templates_Templatesaved1Inputs */
/** @typedef {{}} Templates_Templatedeleted1Inputs */
/** @typedef {{}} Templates_Couldnotregister2Inputs */
/** @typedef {{}} Templates_Couldnotsave2Inputs */
/** @typedef {{}} Templates_Couldnotdelete2Inputs */
/** @typedef {{}} Templates_Couldnotload2Inputs */
/** @typedef {{}} Templates_Loadingtemplates1Inputs */
/** @typedef {{}} Templates_Notemplatesyet2Inputs */
/** @typedef {{}} Templates_Notemplateshint2Inputs */
/** @typedef {{ fileName: NonNullable<unknown> }} Templates_Unsupportedfile1Inputs */
/** @typedef {{}} Templates_RegisteredInputs */
/** @typedef {{}} Templates_SlotsInputs */
/** @typedef {{}} Templates_Noslotsdeclared2Inputs */
/** @typedef {{}} Templates_Outputpatternhint2Inputs */
/** @typedef {{}} Templates_Editexternallyhint2Inputs */
/** @typedef {{}} Templates_EditInputs */
/** @typedef {{}} Templates_Addtitle1Inputs */
/** @typedef {{ name: NonNullable<unknown> }} Templates_Edittitle1Inputs */
/** @typedef {{}} Templates_Templatename1Inputs */
/** @typedef {{}} Templates_ScanningInputs */
/** @typedef {{}} Templates_Rescanfromfile2Inputs */
/** @typedef {{}} Templates_Rescanconfirm1Inputs */
/** @typedef {{}} Templates_Replaceslots1Inputs */
/** @typedef {{}} Templates_Keepmyslots2Inputs */
/** @typedef {{ placeholders: NonNullable<unknown> }} Templates_Docxslotshint2Inputs */
/** @typedef {{}} Templates_Imageslotshint2Inputs */
/** @typedef {{}} Templates_Couldnotscan2Inputs */
/** @typedef {{}} Templates_Slotscanbetyped3Inputs */
/** @typedef {{ index: NonNullable<unknown> }} Templates_Slotaria1Inputs */
/** @typedef {{ index: NonNullable<unknown> }} Templates_Removeslotaria2Inputs */
/** @typedef {{}} Templates_Addslot1Inputs */
/** @typedef {{}} Templates_Outputpatternfield2Inputs */
/** @typedef {{ no: NonNullable<unknown>, name: NonNullable<unknown> }} Templates_Outputpatternplaceholder2Inputs */
/** @typedef {{}} Templates_Registertemplate1Inputs */
/** @typedef {{}} Templates_Savechanges1Inputs */
/** @typedef {{ name: NonNullable<unknown> }} Templates_Deletetitle1Inputs */
/** @typedef {{}} Templates_Deletedescription1Inputs */
/** @typedef {{}} Templates_Thistemplate1Inputs */
/** @typedef {{ count: NonNullable<unknown> }} Templates_Countregisteredone2Inputs */
/** @typedef {{ count: NonNullable<unknown> }} Templates_Countregisteredother2Inputs */
/** @typedef {{ count: NonNullable<unknown>, stamp: NonNullable<unknown> }} Templates_Slotcountone2Inputs */
/** @typedef {{ count: NonNullable<unknown>, stamp: NonNullable<unknown> }} Templates_Slotcountother2Inputs */
/** @typedef {{}} Importpage_Title1Inputs */
/** @typedef {{}} Importpage_Description1Inputs */
/** @typedef {{}} Importpage_Importanotherfile3Inputs */
/** @typedef {{}} Importpage_Dragdrophint3Inputs */
/** @typedef {{}} Importpage_Fileformathint3Inputs */
/** @typedef {{ fileName: NonNullable<unknown> }} Importpage_Parsing1Inputs */
/** @typedef {{}} Importpage_Importcomplete2Inputs */
/** @typedef {{}} Importpage_Gotocompose3Inputs */
/** @typedef {{}} Importpage_Gotorecipients3Inputs */
/** @typedef {{}} Importpage_Couldnotread3Inputs */
/** @typedef {{ fileName: NonNullable<unknown> }} Importpage_Notexcelfile3Inputs */
/** @typedef {{}} Importpage_Couldnotcommit3Inputs */
/** @typedef {{}} Importpage_Preview1Inputs */
/** @typedef {{ fileName: NonNullable<unknown>, shown: NonNullable<unknown>, total: NonNullable<unknown> }} Importpage_Previewrows2Inputs */
/** @typedef {{}} Importpage_Columnmapping2Inputs */
/** @typedef {{}} Importpage_Columnmappinghint3Inputs */
/** @typedef {{ column: NonNullable<unknown> }} Importpage_Columnrolearia3Inputs */
/** @typedef {{}} Importpage_Resetmapping2Inputs */
/** @typedef {{}} Importpage_Selectnamecolumn3Inputs */
/** @typedef {{}} Importpage_Importing1Inputs */
/** @typedef {{}} Importpage_Importrecipients2Inputs */
/** @typedef {{}} Importpage_Nodatarows3Inputs */
/** @typedef {{}} Importpage_Rolename2Inputs */
/** @typedef {{}} Importpage_Roleemail2Inputs */
/** @typedef {{}} Importpage_Rolephone2Inputs */
/** @typedef {{}} Importpage_Rolemetadata2Inputs */
/** @typedef {{}} Importpage_Roleskip2Inputs */
/** @typedef {{ imported: NonNullable<unknown>, fileName: NonNullable<unknown>, duplicatesSkipped: NonNullable<unknown> }} Importpage_Importcompletedetailone4Inputs */
/** @typedef {{ imported: NonNullable<unknown>, fileName: NonNullable<unknown>, duplicatesSkipped: NonNullable<unknown> }} Importpage_Importcompletedetailother4Inputs */
/** @typedef {{ count: NonNullable<unknown> }} Importpage_Rowsskippednonameone5Inputs */
/** @typedef {{ count: NonNullable<unknown> }} Importpage_Rowsskippednonameother5Inputs */
/** @typedef {{ imported: NonNullable<unknown>, duplicatesSkipped: NonNullable<unknown> }} Importpage_Importedtoastone3Inputs */
/** @typedef {{ imported: NonNullable<unknown>, duplicatesSkipped: NonNullable<unknown> }} Importpage_Importedtoastother3Inputs */
/** @typedef {{ count: NonNullable<unknown> }} Importpage_Duplicatesskippedparsingone4Inputs */
/** @typedef {{ count: NonNullable<unknown> }} Importpage_Duplicatesskippedparsingother4Inputs */
/** @typedef {{}} Recipients_TitleInputs */
/** @typedef {{}} Recipients_Couldnotdelete2Inputs */
/** @typedef {{}} Recipients_Deleteselected1Inputs */
/** @typedef {{ count: NonNullable<unknown> }} Recipients_Deleteselectedcount2Inputs */
/** @typedef {{}} Recipients_Searchplaceholder1Inputs */
/** @typedef {{}} Recipients_Searcharia1Inputs */
/** @typedef {{}} Recipients_Filterbybatch2Inputs */
/** @typedef {{}} Recipients_Allbatches1Inputs */
/** @typedef {{}} Recipients_Couldnotload2Inputs */
/** @typedef {{}} Recipients_Loadingrecipients1Inputs */
/** @typedef {{}} Recipients_Norecipientsyet2Inputs */
/** @typedef {{}} Recipients_Norecipientshint2Inputs */
/** @typedef {{}} Recipients_Gotoimport2Inputs */
/** @typedef {{}} Recipients_Nomatchfilters2Inputs */
/** @typedef {{}} Recipients_Nomatchhint2Inputs */
/** @typedef {{}} Recipients_Clearfilters1Inputs */
/** @typedef {{ from: NonNullable<unknown>, to: NonNullable<unknown>, total: NonNullable<unknown> }} Recipients_Showingrange1Inputs */
/** @typedef {{}} Recipients_PreviousInputs */
/** @typedef {{}} Recipients_NextInputs */
/** @typedef {{ page: NonNullable<unknown>, count: NonNullable<unknown> }} Recipients_Pageof1Inputs */
/** @typedef {{}} Recipients_Selectallonpage3Inputs */
/** @typedef {{}} Recipients_NameInputs */
/** @typedef {{}} Recipients_EmailInputs */
/** @typedef {{}} Recipients_PhoneInputs */
/** @typedef {{}} Recipients_Importbatch1Inputs */
/** @typedef {{}} Recipients_ImportedInputs */
/** @typedef {{ name: NonNullable<unknown> }} Recipients_Selectrecipient1Inputs */
/** @typedef {{}} Recipients_Noemailaddress2Inputs */
/** @typedef {{}} Recipients_Customfields1Inputs */
/** @typedef {{}} Recipients_Nocustomfields2Inputs */
/** @typedef {{}} Recipients_Deletedescription1Inputs */
/** @typedef {{ count: NonNullable<unknown> }} Recipients_Countindirectoryone3Inputs */
/** @typedef {{ count: NonNullable<unknown> }} Recipients_Countindirectoryother3Inputs */
/** @typedef {{ count: NonNullable<unknown> }} Recipients_Deletedcountone2Inputs */
/** @typedef {{ count: NonNullable<unknown> }} Recipients_Deletedcountother2Inputs */
/** @typedef {{ count: NonNullable<unknown> }} Recipients_Deletetitleone2Inputs */
/** @typedef {{ count: NonNullable<unknown> }} Recipients_Deletetitleother2Inputs */
/** @typedef {{}} Logs_TitleInputs */
/** @typedef {{}} Logs_DescriptionInputs */
/** @typedef {{}} Logs_Filterbystatus2Inputs */
/** @typedef {{}} Logs_Allstatuses1Inputs */
/** @typedef {{}} Logs_FromInputs */
/** @typedef {{}} Logs_ToInputs */
/** @typedef {{}} Logs_Jobscreatedfrom2Inputs */
/** @typedef {{}} Logs_Jobscreatedupto3Inputs */
/** @typedef {{}} Logs_Couldnotload2Inputs */
/** @typedef {{}} Logs_Loadinglogs1Inputs */
/** @typedef {{}} Logs_Nojobsmatchfilters3Inputs */
/** @typedef {{}} Logs_Nojobshint2Inputs */
/** @typedef {{}} Logs_Nosendjobsyet3Inputs */
/** @typedef {{}} Logs_Nosendjobshint3Inputs */
/** @typedef {{}} Logs_StatusInputs */
/** @typedef {{}} Logs_SubjectInputs */
/** @typedef {{}} Logs_TemplateInputs */
/** @typedef {{}} Logs_Sentfailedskipped2Inputs */
/** @typedef {{}} Logs_StartedInputs */
/** @typedef {{}} Logs_DurationInputs */
/** @typedef {{ sent: NonNullable<unknown>, total: NonNullable<unknown> }} Logs_Pausedprogress1Inputs */
/** @typedef {{}} Logs_ResumingInputs */
/** @typedef {{}} Jobdetail_Alllogs2Inputs */
/** @typedef {{}} Jobdetail_Jobdetail2Inputs */
/** @typedef {{ sent: NonNullable<unknown>, failed: NonNullable<unknown>, skipped: NonNullable<unknown> }} Jobdetail_Counts1Inputs */
/** @typedef {{}} Jobdetail_Resume1Inputs */
/** @typedef {{ count: NonNullable<unknown> }} Jobdetail_Retryallfailures3Inputs */
/** @typedef {{}} Jobdetail_Template1Inputs */
/** @typedef {{}} Jobdetail_Smtp1Inputs */
/** @typedef {{}} Jobdetail_Sender1Inputs */
/** @typedef {{}} Jobdetail_Startedduration2Inputs */
/** @typedef {{}} Jobdetail_Deletedprofile2Inputs */
/** @typedef {{}} Jobdetail_Inline1Inputs */
/** @typedef {{}} Jobdetail_Recipient1Inputs */
/** @typedef {{}} Jobdetail_Noemailaddress3Inputs */
/** @typedef {{}} Jobdetail_Error1Inputs */
/** @typedef {{}} Jobdetail_Sentat2Inputs */
/** @typedef {{}} Jobdetail_Messageid2Inputs */
/** @typedef {{}} Jobdetail_Retry1Inputs */
/** @typedef {{}} Jobdetail_Searchplaceholder2Inputs */
/** @typedef {{}} Jobdetail_Searcharia2Inputs */
/** @typedef {{}} Jobdetail_Filterbystatus3Inputs */
/** @typedef {{}} Jobdetail_Loadingjob2Inputs */
/** @typedef {{}} Jobdetail_Couldnotload3Inputs */
/** @typedef {{}} Jobdetail_Jobnotfound3Inputs */
/** @typedef {{}} Jobdetail_Jobnotfoundhint4Inputs */
/** @typedef {{}} Jobdetail_Backtologs3Inputs */
/** @typedef {{}} Jobdetail_Nomatchsearch3Inputs */
/** @typedef {{}} Jobdetail_Nomatchhint3Inputs */
/** @typedef {{}} Jobdetail_Status1Inputs */
/** @typedef {{}} Sendjob_Selectrecipients2Inputs */
/** @typedef {{}} Sendjob_Writesubject2Inputs */
/** @typedef {{}} Sendjob_Writebody2Inputs */
/** @typedef {{}} Sendjob_Entersender2Inputs */
/** @typedef {{}} Sendjob_Chooseoneidentity3Inputs */
/** @typedef {{}} Sendjob_Norecipientsexist3Inputs */
/** @typedef {{}} Sendjob_Alreadysending2Inputs */
/** @typedef {{}} Sendjob_Anothersendactive3Inputs */
/** @typedef {{}} Sendjob_Stillpausing2Inputs */
/** @typedef {{}} Sendjob_Onlysendingcanpause4Inputs */
/** @typedef {{}} Sendjob_Onlypausedcanresume4Inputs */
/** @typedef {{}} Sendjob_Finishedcannotcancel3Inputs */
/** @typedef {{}} Sendjob_Onlyfinishedcanretry4Inputs */
/** @typedef {{}} Sendjob_Nofailedrecipients3Inputs */
/** @typedef {{}} Sendjob_Noconfirmedattachments3Inputs */
/** @typedef {{}} Sendjob_Attachmentsmissingondisk4Inputs */
/** @typedef {{}} Sendjob_Recipientdeleted2Inputs */
/** @typedef {{}} Sendjob_Recipientnoemail3Inputs */
/** @typedef {{}} Sendjob_Noattachmentforrecipient4Inputs */
/** @typedef {{ message: NonNullable<unknown> }} Sendjob_Retriesexhausted2Inputs */
/** @typedef {{}} Sendjob_Couldnotresumejob4Inputs */
/** @typedef {{}} Generatejob_Templatemissing2Inputs */
/** @typedef {{ path: NonNullable<unknown> }} Generatejob_Templatefilemissing3Inputs */
/** @typedef {{}} Generatejob_Libreofficemissing3Inputs */
/** @typedef {{}} Generatejob_Recipientdeleted2Inputs */
/** @typedef {{ slot: NonNullable<unknown> }} Generatejob_Missingslotdata3Inputs */
/** @typedef {{ message: NonNullable<unknown> }} Generatejob_Couldnotfill3Inputs */
/** @typedef {{}} Generatejob_Nopdfproduced3Inputs */
/** @typedef {{}} Generatejob_Selectrecipients2Inputs */
/** @typedef {{}} Generatejob_Norecipientsexist3Inputs */
/** @typedef {{}} Generatejob_Jobcouldnotbecreated5Inputs */
/** @typedef {{ name: NonNullable<unknown> }} Generatejob_Nofreefilename4Inputs */
/** @typedef {{}} Templatesservice_Docxonly2Inputs */
/** @typedef {{ path: NonNullable<unknown>, detail: NonNullable<unknown> }} Templatesservice_Couldnotread3Inputs */
/** @typedef {{}} Importservice_Nonamecolumn3Inputs */
/** @typedef {{}} Importservice_Noemailcolumn3Inputs */
/** @typedef {{}} Importservice_Notexcel2Inputs */
/** @typedef {{ headers: NonNullable<unknown> }} Importservice_Duplicateheaders2Inputs */
/** @typedef {{ count: NonNullable<unknown> }} Importservice_Rowsskippedemptyname4Inputs */
/** @typedef {{}} Validation_Smtpnamerequired2Inputs */
/** @typedef {{}} Validation_Smtphostrequired2Inputs */
/** @typedef {{}} Validation_Smtpportinvalid2Inputs */
/** @typedef {{}} Validation_Smtpusernamerequired2Inputs */
/** @typedef {{}} Validation_Smtppasswordrequired2Inputs */
/** @typedef {{}} Validation_Templatenamerequired2Inputs */
/** @typedef {{}} Validation_Templateneedsslot2Inputs */
/** @typedef {{ name: NonNullable<unknown> }} Validation_Templatepatternneedsslot3Inputs */
/** @typedef {{ slot: NonNullable<unknown> }} Validation_Templatepatternunknownslot3Inputs */
/** @typedef {{}} Dialogs_Excelfilter1Inputs */
/** @typedef {{}} Dialogs_Templatefilter1Inputs */
import * as __en from "./en.js"
import * as __id from "./id.js"
/**
* | output |
* | --- |
* | "Back" |
*
* @param {Common_BackInputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const common_back = /** @type {((inputs?: Common_BackInputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Common_BackInputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return __id.common_back(inputs)
	return __en.common_back(inputs)
});
export { common_back as "common.back" }
/**
* | output |
* | --- |
* | "Next" |
*
* @param {Common_NextInputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const common_next = /** @type {((inputs?: Common_NextInputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Common_NextInputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return __id.common_next(inputs)
	return __en.common_next(inputs)
});
export { common_next as "common.next" }
/**
* | output |
* | --- |
* | "Cancel" |
*
* @param {Common_CancelInputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const common_cancel = /** @type {((inputs?: Common_CancelInputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Common_CancelInputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return __id.common_cancel(inputs)
	return __en.common_cancel(inputs)
});
export { common_cancel as "common.cancel" }
/**
* | output |
* | --- |
* | "Save" |
*
* @param {Common_SaveInputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const common_save = /** @type {((inputs?: Common_SaveInputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Common_SaveInputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return __id.common_save(inputs)
	return __en.common_save(inputs)
});
export { common_save as "common.save" }
/**
* | output |
* | --- |
* | "Delete" |
*
* @param {Common_DeleteInputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const common_delete = /** @type {((inputs?: Common_DeleteInputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Common_DeleteInputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return __id.common_delete(inputs)
	return __en.common_delete(inputs)
});
export { common_delete as "common.delete" }
/**
* | output |
* | --- |
* | "Retry" |
*
* @param {Common_RetryInputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const common_retry = /** @type {((inputs?: Common_RetryInputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Common_RetryInputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return __id.common_retry(inputs)
	return __en.common_retry(inputs)
});
export { common_retry as "common.retry" }
/**
* | output |
* | --- |
* | "Resume" |
*
* @param {Common_ResumeInputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const common_resume = /** @type {((inputs?: Common_ResumeInputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Common_ResumeInputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return __id.common_resume(inputs)
	return __en.common_resume(inputs)
});
export { common_resume as "common.resume" }
/**
* | output |
* | --- |
* | "Pause" |
*
* @param {Common_PauseInputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const common_pause = /** @type {((inputs?: Common_PauseInputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Common_PauseInputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return __id.common_pause(inputs)
	return __en.common_pause(inputs)
});
export { common_pause as "common.pause" }
/**
* | output |
* | --- |
* | "Prev" |
*
* @param {Common_PrevInputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const common_prev = /** @type {((inputs?: Common_PrevInputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Common_PrevInputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return __id.common_prev(inputs)
	return __en.common_prev(inputs)
});
export { common_prev as "common.prev" }
/**
* | output |
* | --- |
* | "Clear" |
*
* @param {Common_ClearInputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const common_clear = /** @type {((inputs?: Common_ClearInputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Common_ClearInputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return __id.common_clear(inputs)
	return __en.common_clear(inputs)
});
export { common_clear as "common.clear" }
/**
* | output |
* | --- |
* | "Dismiss" |
*
* @param {Common_DismissInputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const common_dismiss = /** @type {((inputs?: Common_DismissInputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Common_DismissInputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return __id.common_dismiss(inputs)
	return __en.common_dismiss(inputs)
});
export { common_dismiss as "common.dismiss" }
/**
* | output |
* | --- |
* | "Browse…" |
*
* @param {Common_BrowseInputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const common_browse = /** @type {((inputs?: Common_BrowseInputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Common_BrowseInputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return __id.common_browse(inputs)
	return __en.common_browse(inputs)
});
export { common_browse as "common.browse" }
/**
* | output |
* | --- |
* | "Loading…" |
*
* @param {Common_LoadingInputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const common_loading = /** @type {((inputs?: Common_LoadingInputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Common_LoadingInputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return __id.common_loading(inputs)
	return __en.common_loading(inputs)
});
export { common_loading as "common.loading" }
/**
* | output |
* | --- |
* | "Saved" |
*
* @param {Common_SavedInputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const common_saved = /** @type {((inputs?: Common_SavedInputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Common_SavedInputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return __id.common_saved(inputs)
	return __en.common_saved(inputs)
});
export { common_saved as "common.saved" }
/**
* | output |
* | --- |
* | "Saving…" |
*
* @param {Common_SavingInputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const common_saving = /** @type {((inputs?: Common_SavingInputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Common_SavingInputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return __id.common_saving(inputs)
	return __en.common_saving(inputs)
});
export { common_saving as "common.saving" }
/**
* | output |
* | --- |
* | "Deleting…" |
*
* @param {Common_DeletingInputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const common_deleting = /** @type {((inputs?: Common_DeletingInputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Common_DeletingInputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return __id.common_deleting(inputs)
	return __en.common_deleting(inputs)
});
export { common_deleting as "common.deleting" }
/**
* | output |
* | --- |
* | "Testing…" |
*
* @param {Common_TestingInputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const common_testing = /** @type {((inputs?: Common_TestingInputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Common_TestingInputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return __id.common_testing(inputs)
	return __en.common_testing(inputs)
});
export { common_testing as "common.testing" }
/**
* | output |
* | --- |
* | "Close details" |
*
* @param {Common_Closedetails1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const common_closedetails1 = /** @type {((inputs?: Common_Closedetails1Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Common_Closedetails1Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return __id.common_closedetails1(inputs)
	return __en.common_closedetails1(inputs)
});
export { common_closedetails1 as "common.closeDetails" }
/**
* | output |
* | --- |
* | "Could not load {key}." |
*
* @param {Common_Couldnotload2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const common_couldnotload2 = /** @type {((inputs: Common_Couldnotload2Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Common_Couldnotload2Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return __id.common_couldnotload2(inputs)
	return __en.common_couldnotload2(inputs)
});
export { common_couldnotload2 as "common.couldNotLoad" }
/**
* | output |
* | --- |
* | "Could not save {key}." |
*
* @param {Common_Couldnotsave2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const common_couldnotsave2 = /** @type {((inputs: Common_Couldnotsave2Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Common_Couldnotsave2Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return __id.common_couldnotsave2(inputs)
	return __en.common_couldnotsave2(inputs)
});
export { common_couldnotsave2 as "common.couldNotSave" }
/**
* | output |
* | --- |
* | "Retry Failures" |
*
* @param {Common_Retryfailures1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const common_retryfailures1 = /** @type {((inputs?: Common_Retryfailures1Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Common_Retryfailures1Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return __id.common_retryfailures1(inputs)
	return __en.common_retryfailures1(inputs)
});
export { common_retryfailures1 as "common.retryFailures" }
/**
* | output |
* | --- |
* | "Import" |
*
* @param {Nav_ImportInputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const nav_import = /** @type {((inputs?: Nav_ImportInputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Nav_ImportInputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return __id.nav_import(inputs)
	return __en.nav_import(inputs)
});
export { nav_import as "nav.import" }
/**
* | output |
* | --- |
* | "Recipients" |
*
* @param {Nav_RecipientsInputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const nav_recipients = /** @type {((inputs?: Nav_RecipientsInputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Nav_RecipientsInputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return __id.nav_recipients(inputs)
	return __en.nav_recipients(inputs)
});
export { nav_recipients as "nav.recipients" }
/**
* | output |
* | --- |
* | "Templates" |
*
* @param {Nav_TemplatesInputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const nav_templates = /** @type {((inputs?: Nav_TemplatesInputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Nav_TemplatesInputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return __id.nav_templates(inputs)
	return __en.nav_templates(inputs)
});
export { nav_templates as "nav.templates" }
/**
* | output |
* | --- |
* | "Compose" |
*
* @param {Nav_ComposeInputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const nav_compose = /** @type {((inputs?: Nav_ComposeInputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Nav_ComposeInputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return __id.nav_compose(inputs)
	return __en.nav_compose(inputs)
});
export { nav_compose as "nav.compose" }
/**
* | output |
* | --- |
* | "Logs" |
*
* @param {Nav_LogsInputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const nav_logs = /** @type {((inputs?: Nav_LogsInputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Nav_LogsInputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return __id.nav_logs(inputs)
	return __en.nav_logs(inputs)
});
export { nav_logs as "nav.logs" }
/**
* | output |
* | --- |
* | "Settings" |
*
* @param {Nav_SettingsInputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const nav_settings = /** @type {((inputs?: Nav_SettingsInputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Nav_SettingsInputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return __id.nav_settings(inputs)
	return __en.nav_settings(inputs)
});
export { nav_settings as "nav.settings" }
/**
* | output |
* | --- |
* | "Could not reach the app backend. The database may not be ready yet." |
*
* @param {App_Backendunreachable1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const app_backendunreachable1 = /** @type {((inputs?: App_Backendunreachable1Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<App_Backendunreachable1Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return __id.app_backendunreachable1(inputs)
	return __en.app_backendunreachable1(inputs)
});
export { app_backendunreachable1 as "app.backendUnreachable" }
/**
* | output |
* | --- |
* | "Welcome to Email Blast" |
*
* @param {Welcome_TitleInputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const welcome_title = /** @type {((inputs?: Welcome_TitleInputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Welcome_TitleInputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return __id.welcome_title(inputs)
	return __en.welcome_title(inputs)
});
export { welcome_title as "welcome.title" }
/**
* | output |
* | --- |
* | "One last check before you start sending." |
*
* @param {Welcome_SubtitleInputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const welcome_subtitle = /** @type {((inputs?: Welcome_SubtitleInputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Welcome_SubtitleInputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return __id.welcome_subtitle(inputs)
	return __en.welcome_subtitle(inputs)
});
export { welcome_subtitle as "welcome.subtitle" }
/**
* | output |
* | --- |
* | "Checking for LibreOffice..." |
*
* @param {Welcome_Checkinglibreoffice2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const welcome_checkinglibreoffice2 = /** @type {((inputs?: Welcome_Checkinglibreoffice2Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Welcome_Checkinglibreoffice2Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return __id.welcome_checkinglibreoffice2(inputs)
	return __en.welcome_checkinglibreoffice2(inputs)
});
export { welcome_checkinglibreoffice2 as "welcome.checkingLibreOffice" }
/**
* | output |
* | --- |
* | "Used to convert letters to PDF" |
*
* @param {Welcome_Libreofficepurpose2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const welcome_libreofficepurpose2 = /** @type {((inputs?: Welcome_Libreofficepurpose2Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Welcome_Libreofficepurpose2Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return __id.welcome_libreofficepurpose2(inputs)
	return __en.welcome_libreofficepurpose2(inputs)
});
export { welcome_libreofficepurpose2 as "welcome.libreOfficePurpose" }
/**
* | output |
* | --- |
* | "LibreOffice found" |
*
* @param {Welcome_Libreofficefound2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const welcome_libreofficefound2 = /** @type {((inputs?: Welcome_Libreofficefound2Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Welcome_Libreofficefound2Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return __id.welcome_libreofficefound2(inputs)
	return __en.welcome_libreofficefound2(inputs)
});
export { welcome_libreofficefound2 as "welcome.libreOfficeFound" }
/**
* | output |
* | --- |
* | "LibreOffice is not installed" |
*
* @param {Welcome_Libreofficemissing2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const welcome_libreofficemissing2 = /** @type {((inputs?: Welcome_Libreofficemissing2Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Welcome_Libreofficemissing2Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return __id.welcome_libreofficemissing2(inputs)
	return __en.welcome_libreofficemissing2(inputs)
});
export { welcome_libreofficemissing2 as "welcome.libreOfficeMissing" }
/**
* | output |
* | --- |
* | "Email Blast uses LibreOffice to convert filled letters to PDF." |
*
* @param {Welcome_Libreofficemissingdetail3Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const welcome_libreofficemissingdetail3 = /** @type {((inputs?: Welcome_Libreofficemissingdetail3Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Welcome_Libreofficemissingdetail3Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return __id.welcome_libreofficemissingdetail3(inputs)
	return __en.welcome_libreofficemissingdetail3(inputs)
});
export { welcome_libreofficemissingdetail3 as "welcome.libreOfficeMissingDetail" }
/**
* | output |
* | --- |
* | "Install it with" |
*
* @param {Welcome_Installwith1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const welcome_installwith1 = /** @type {((inputs?: Welcome_Installwith1Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Welcome_Installwith1Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return __id.welcome_installwith1(inputs)
	return __en.welcome_installwith1(inputs)
});
export { welcome_installwith1 as "welcome.installWith" }
/**
* | output |
* | --- |
* | "Download it from" |
*
* @param {Welcome_Downloadfrom1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const welcome_downloadfrom1 = /** @type {((inputs?: Welcome_Downloadfrom1Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Welcome_Downloadfrom1Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return __id.welcome_downloadfrom1(inputs)
	return __en.welcome_downloadfrom1(inputs)
});
export { welcome_downloadfrom1 as "welcome.downloadFrom" }
/**
* | output |
* | --- |
* | "Check Again" |
*
* @param {Welcome_Checkagain1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const welcome_checkagain1 = /** @type {((inputs?: Welcome_Checkagain1Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Welcome_Checkagain1Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return __id.welcome_checkagain1(inputs)
	return __en.welcome_checkagain1(inputs)
});
export { welcome_checkagain1 as "welcome.checkAgain" }
/**
* | output |
* | --- |
* | "Templates folder" |
*
* @param {Welcome_Templatesfolder1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const welcome_templatesfolder1 = /** @type {((inputs?: Welcome_Templatesfolder1Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Welcome_Templatesfolder1Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return __id.welcome_templatesfolder1(inputs)
	return __en.welcome_templatesfolder1(inputs)
});
export { welcome_templatesfolder1 as "welcome.templatesFolder" }
/**
* | output |
* | --- |
* | "Output folder" |
*
* @param {Welcome_Outputfolder1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const welcome_outputfolder1 = /** @type {((inputs?: Welcome_Outputfolder1Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Welcome_Outputfolder1Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return __id.welcome_outputfolder1(inputs)
	return __en.welcome_outputfolder1(inputs)
});
export { welcome_outputfolder1 as "welcome.outputFolder" }
/**
* | output |
* | --- |
* | "Setting up…" |
*
* @param {Welcome_Settingup1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const welcome_settingup1 = /** @type {((inputs?: Welcome_Settingup1Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Welcome_Settingup1Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return __id.welcome_settingup1(inputs)
	return __en.welcome_settingup1(inputs)
});
export { welcome_settingup1 as "welcome.settingUp" }
/**
* | output |
* | --- |
* | "Get Started" |
*
* @param {Welcome_Getstarted1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const welcome_getstarted1 = /** @type {((inputs?: Welcome_Getstarted1Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Welcome_Getstarted1Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return __id.welcome_getstarted1(inputs)
	return __en.welcome_getstarted1(inputs)
});
export { welcome_getstarted1 as "welcome.getStarted" }
/**
* | output |
* | --- |
* | "Pending" |
*
* @param {Status_PendingInputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const status_pending = /** @type {((inputs?: Status_PendingInputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Status_PendingInputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return __id.status_pending(inputs)
	return __en.status_pending(inputs)
});
export { status_pending as "status.pending" }
/**
* | output |
* | --- |
* | "Sending" |
*
* @param {Status_SendingInputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const status_sending = /** @type {((inputs?: Status_SendingInputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Status_SendingInputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return __id.status_sending(inputs)
	return __en.status_sending(inputs)
});
export { status_sending as "status.sending" }
/**
* | output |
* | --- |
* | "Paused" |
*
* @param {Status_PausedInputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const status_paused = /** @type {((inputs?: Status_PausedInputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Status_PausedInputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return __id.status_paused(inputs)
	return __en.status_paused(inputs)
});
export { status_paused as "status.paused" }
/**
* | output |
* | --- |
* | "Completed" |
*
* @param {Status_CompletedInputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const status_completed = /** @type {((inputs?: Status_CompletedInputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Status_CompletedInputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return __id.status_completed(inputs)
	return __en.status_completed(inputs)
});
export { status_completed as "status.completed" }
/**
* | output |
* | --- |
* | "Cancelled" |
*
* @param {Status_CancelledInputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const status_cancelled = /** @type {((inputs?: Status_CancelledInputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Status_CancelledInputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return __id.status_cancelled(inputs)
	return __en.status_cancelled(inputs)
});
export { status_cancelled as "status.cancelled" }
/**
* | output |
* | --- |
* | "Failed" |
*
* @param {Status_FailedInputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const status_failed = /** @type {((inputs?: Status_FailedInputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Status_FailedInputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return __id.status_failed(inputs)
	return __en.status_failed(inputs)
});
export { status_failed as "status.failed" }
/**
* | output |
* | --- |
* | "Skipped" |
*
* @param {Status_SkippedInputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const status_skipped = /** @type {((inputs?: Status_SkippedInputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Status_SkippedInputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return __id.status_skipped(inputs)
	return __en.status_skipped(inputs)
});
export { status_skipped as "status.skipped" }
/**
* | output |
* | --- |
* | "Sent" |
*
* @param {Status_SentInputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const status_sent = /** @type {((inputs?: Status_SentInputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Status_SentInputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return __id.status_sent(inputs)
	return __en.status_sent(inputs)
});
export { status_sent as "status.sent" }
/**
* | output |
* | --- |
* | "Settings" |
*
* @param {Settingspage_Title1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const settingspage_title1 = /** @type {((inputs?: Settingspage_Title1Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Settingspage_Title1Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return __id.settingspage_title1(inputs)
	return __en.settingspage_title1(inputs)
});
export { settingspage_title1 as "settingsPage.title" }
/**
* | output |
* | --- |
* | "SMTP profiles, sending rate, default folders, and app information." |
*
* @param {Settingspage_Description1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const settingspage_description1 = /** @type {((inputs?: Settingspage_Description1Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Settingspage_Description1Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return __id.settingspage_description1(inputs)
	return __en.settingspage_description1(inputs)
});
export { settingspage_description1 as "settingsPage.description" }
/**
* | output |
* | --- |
* | "Rate limiting" |
*
* @param {Settingspage_Ratelimiting2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const settingspage_ratelimiting2 = /** @type {((inputs?: Settingspage_Ratelimiting2Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Settingspage_Ratelimiting2Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return __id.settingspage_ratelimiting2(inputs)
	return __en.settingspage_ratelimiting2(inputs)
});
export { settingspage_ratelimiting2 as "settingsPage.rateLimiting" }
/**
* | output |
* | --- |
* | "The delay between each email while a send job runs." |
*
* @param {Settingspage_Ratelimitingdescription3Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const settingspage_ratelimitingdescription3 = /** @type {((inputs?: Settingspage_Ratelimitingdescription3Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Settingspage_Ratelimitingdescription3Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return __id.settingspage_ratelimitingdescription3(inputs)
	return __en.settingspage_ratelimitingdescription3(inputs)
});
export { settingspage_ratelimitingdescription3 as "settingsPage.rateLimitingDescription" }
/**
* | output |
* | --- |
* | "{ms} ms per email" |
*
* @param {Settingspage_Msperemail3Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const settingspage_msperemail3 = /** @type {((inputs: Settingspage_Msperemail3Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Settingspage_Msperemail3Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return __id.settingspage_msperemail3(inputs)
	return __en.settingspage_msperemail3(inputs)
});
export { settingspage_msperemail3 as "settingsPage.msPerEmail" }
/**
* | output |
* | --- |
* | "Delay between emails" |
*
* @param {Settingspage_Delaybetweenemails3Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const settingspage_delaybetweenemails3 = /** @type {((inputs?: Settingspage_Delaybetweenemails3Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Settingspage_Delaybetweenemails3Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return __id.settingspage_delaybetweenemails3(inputs)
	return __en.settingspage_delaybetweenemails3(inputs)
});
export { settingspage_delaybetweenemails3 as "settingsPage.delayBetweenEmails" }
/**
* | output |
* | --- |
* | "Default folders" |
*
* @param {Settingspage_Defaultfolders2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const settingspage_defaultfolders2 = /** @type {((inputs?: Settingspage_Defaultfolders2Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Settingspage_Defaultfolders2Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return __id.settingspage_defaultfolders2(inputs)
	return __en.settingspage_defaultfolders2(inputs)
});
export { settingspage_defaultfolders2 as "settingsPage.defaultFolders" }
/**
* | output |
* | --- |
* | "Where templates live and where generated PDFs are written. The app creates them when missing." |
*
* @param {Settingspage_Defaultfoldersdescription3Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const settingspage_defaultfoldersdescription3 = /** @type {((inputs?: Settingspage_Defaultfoldersdescription3Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Settingspage_Defaultfoldersdescription3Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return __id.settingspage_defaultfoldersdescription3(inputs)
	return __en.settingspage_defaultfoldersdescription3(inputs)
});
export { settingspage_defaultfoldersdescription3 as "settingsPage.defaultFoldersDescription" }
/**
* | output |
* | --- |
* | "Templates folder" |
*
* @param {Settingspage_Templatesfolder2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const settingspage_templatesfolder2 = /** @type {((inputs?: Settingspage_Templatesfolder2Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Settingspage_Templatesfolder2Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return __id.settingspage_templatesfolder2(inputs)
	return __en.settingspage_templatesfolder2(inputs)
});
export { settingspage_templatesfolder2 as "settingsPage.templatesFolder" }
/**
* | output |
* | --- |
* | "Output folder" |
*
* @param {Settingspage_Outputfolder2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const settingspage_outputfolder2 = /** @type {((inputs?: Settingspage_Outputfolder2Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Settingspage_Outputfolder2Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return __id.settingspage_outputfolder2(inputs)
	return __en.settingspage_outputfolder2(inputs)
});
export { settingspage_outputfolder2 as "settingsPage.outputFolder" }
/**
* | output |
* | --- |
* | "About" |
*
* @param {Settingspage_About1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const settingspage_about1 = /** @type {((inputs?: Settingspage_About1Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Settingspage_About1Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return __id.settingspage_about1(inputs)
	return __en.settingspage_about1(inputs)
});
export { settingspage_about1 as "settingsPage.about" }
/**
* | output |
* | --- |
* | "App" |
*
* @param {Settingspage_App1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const settingspage_app1 = /** @type {((inputs?: Settingspage_App1Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Settingspage_App1Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return __id.settingspage_app1(inputs)
	return __en.settingspage_app1(inputs)
});
export { settingspage_app1 as "settingsPage.app" }
/**
* | output |
* | --- |
* | "Version" |
*
* @param {Settingspage_Version1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const settingspage_version1 = /** @type {((inputs?: Settingspage_Version1Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Settingspage_Version1Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return __id.settingspage_version1(inputs)
	return __en.settingspage_version1(inputs)
});
export { settingspage_version1 as "settingsPage.version" }
/**
* | output |
* | --- |
* | "Data" |
*
* @param {Settingspage_Data1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const settingspage_data1 = /** @type {((inputs?: Settingspage_Data1Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Settingspage_Data1Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return __id.settingspage_data1(inputs)
	return __en.settingspage_data1(inputs)
});
export { settingspage_data1 as "settingsPage.data" }
/**
* | output |
* | --- |
* | "Stored locally on this machine" |
*
* @param {Settingspage_Storedlocally2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const settingspage_storedlocally2 = /** @type {((inputs?: Settingspage_Storedlocally2Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Settingspage_Storedlocally2Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return __id.settingspage_storedlocally2(inputs)
	return __en.settingspage_storedlocally2(inputs)
});
export { settingspage_storedlocally2 as "settingsPage.storedLocally" }
/**
* | output |
* | --- |
* | "Language" |
*
* @param {Settingspage_Language1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const settingspage_language1 = /** @type {((inputs?: Settingspage_Language1Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Settingspage_Language1Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return __id.settingspage_language1(inputs)
	return __en.settingspage_language1(inputs)
});
export { settingspage_language1 as "settingsPage.language" }
/**
* | output |
* | --- |
* | "The language the app interface is shown in." |
*
* @param {Settingspage_Languagedescription2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const settingspage_languagedescription2 = /** @type {((inputs?: Settingspage_Languagedescription2Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Settingspage_Languagedescription2Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return __id.settingspage_languagedescription2(inputs)
	return __en.settingspage_languagedescription2(inputs)
});
export { settingspage_languagedescription2 as "settingsPage.languageDescription" }
/**
* | output |
* | --- |
* | "{rate} email per second" |
*
* @param {Settingspage_Ratepersecondone4Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const settingspage_ratepersecondone4 = /** @type {((inputs: Settingspage_Ratepersecondone4Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Settingspage_Ratepersecondone4Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return __id.settingspage_ratepersecondone4(inputs)
	return __en.settingspage_ratepersecondone4(inputs)
});
export { settingspage_ratepersecondone4 as "settingsPage.ratePerSecondOne" }
/**
* | output |
* | --- |
* | "{rate} emails per second" |
*
* @param {Settingspage_Ratepersecondother4Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const settingspage_ratepersecondother4 = /** @type {((inputs: Settingspage_Ratepersecondother4Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Settingspage_Ratepersecondother4Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return __id.settingspage_ratepersecondother4(inputs)
	return __en.settingspage_ratepersecondother4(inputs)
});
export { settingspage_ratepersecondother4 as "settingsPage.ratePerSecondOther" }
/**
* | output |
* | --- |
* | "Could not load settings." |
*
* @param {Settingspage_Couldnotload3Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const settingspage_couldnotload3 = /** @type {((inputs?: Settingspage_Couldnotload3Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Settingspage_Couldnotload3Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return __id.settingspage_couldnotload3(inputs)
	return __en.settingspage_couldnotload3(inputs)
});
export { settingspage_couldnotload3 as "settingsPage.couldNotLoad" }
/**
* | output |
* | --- |
* | "SMTP profiles" |
*
* @param {Smtp_TitleInputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const smtp_title = /** @type {((inputs?: Smtp_TitleInputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Smtp_TitleInputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return __id.smtp_title(inputs)
	return __en.smtp_title(inputs)
});
export { smtp_title as "smtp.title" }
/**
* | output |
* | --- |
* | "Saved sender identities the compose wizard can pick from. Passwords are stored locally and never shown." |
*
* @param {Smtp_DescriptionInputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const smtp_description = /** @type {((inputs?: Smtp_DescriptionInputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Smtp_DescriptionInputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return __id.smtp_description(inputs)
	return __en.smtp_description(inputs)
});
export { smtp_description as "smtp.description" }
/**
* | output |
* | --- |
* | "Add profile" |
*
* @param {Smtp_Addprofile1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const smtp_addprofile1 = /** @type {((inputs?: Smtp_Addprofile1Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Smtp_Addprofile1Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return __id.smtp_addprofile1(inputs)
	return __en.smtp_addprofile1(inputs)
});
export { smtp_addprofile1 as "smtp.addProfile" }
/**
* | output |
* | --- |
* | "Profile \"{name}\" saved." |
*
* @param {Smtp_Profilesaved1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const smtp_profilesaved1 = /** @type {((inputs: Smtp_Profilesaved1Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Smtp_Profilesaved1Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return __id.smtp_profilesaved1(inputs)
	return __en.smtp_profilesaved1(inputs)
});
export { smtp_profilesaved1 as "smtp.profileSaved" }
/**
* | output |
* | --- |
* | "Profile deleted." |
*
* @param {Smtp_Profiledeleted1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const smtp_profiledeleted1 = /** @type {((inputs?: Smtp_Profiledeleted1Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Smtp_Profiledeleted1Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return __id.smtp_profiledeleted1(inputs)
	return __en.smtp_profiledeleted1(inputs)
});
export { smtp_profiledeleted1 as "smtp.profileDeleted" }
/**
* | output |
* | --- |
* | "Could not save the profile." |
*
* @param {Smtp_Couldnotsaveprofile3Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const smtp_couldnotsaveprofile3 = /** @type {((inputs?: Smtp_Couldnotsaveprofile3Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Smtp_Couldnotsaveprofile3Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return __id.smtp_couldnotsaveprofile3(inputs)
	return __en.smtp_couldnotsaveprofile3(inputs)
});
export { smtp_couldnotsaveprofile3 as "smtp.couldNotSaveProfile" }
/**
* | output |
* | --- |
* | "Could not delete the profile." |
*
* @param {Smtp_Couldnotdeleteprofile3Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const smtp_couldnotdeleteprofile3 = /** @type {((inputs?: Smtp_Couldnotdeleteprofile3Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Smtp_Couldnotdeleteprofile3Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return __id.smtp_couldnotdeleteprofile3(inputs)
	return __en.smtp_couldnotdeleteprofile3(inputs)
});
export { smtp_couldnotdeleteprofile3 as "smtp.couldNotDeleteProfile" }
/**
* | output |
* | --- |
* | "Could not load SMTP profiles." |
*
* @param {Smtp_Couldnotloadprofiles3Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const smtp_couldnotloadprofiles3 = /** @type {((inputs?: Smtp_Couldnotloadprofiles3Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Smtp_Couldnotloadprofiles3Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return __id.smtp_couldnotloadprofiles3(inputs)
	return __en.smtp_couldnotloadprofiles3(inputs)
});
export { smtp_couldnotloadprofiles3 as "smtp.couldNotLoadProfiles" }
/**
* | output |
* | --- |
* | "Loading profiles…" |
*
* @param {Smtp_Loadingprofiles1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const smtp_loadingprofiles1 = /** @type {((inputs?: Smtp_Loadingprofiles1Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Smtp_Loadingprofiles1Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return __id.smtp_loadingprofiles1(inputs)
	return __en.smtp_loadingprofiles1(inputs)
});
export { smtp_loadingprofiles1 as "smtp.loadingProfiles" }
/**
* | output |
* | --- |
* | "No SMTP profiles yet" |
*
* @param {Smtp_Noprofilesyet2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const smtp_noprofilesyet2 = /** @type {((inputs?: Smtp_Noprofilesyet2Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Smtp_Noprofilesyet2Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return __id.smtp_noprofilesyet2(inputs)
	return __en.smtp_noprofilesyet2(inputs)
});
export { smtp_noprofilesyet2 as "smtp.noProfilesYet" }
/**
* | output |
* | --- |
* | "Save your SMTP server details once (e.g. Gmail with an app password) and reuse them for every campaign." |
*
* @param {Smtp_Noprofilesdescription2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const smtp_noprofilesdescription2 = /** @type {((inputs?: Smtp_Noprofilesdescription2Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Smtp_Noprofilesdescription2Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return __id.smtp_noprofilesdescription2(inputs)
	return __en.smtp_noprofilesdescription2(inputs)
});
export { smtp_noprofilesdescription2 as "smtp.noProfilesDescription" }
/**
* | output |
* | --- |
* | "Test connection" |
*
* @param {Smtp_Testconnection1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const smtp_testconnection1 = /** @type {((inputs?: Smtp_Testconnection1Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Smtp_Testconnection1Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return __id.smtp_testconnection1(inputs)
	return __en.smtp_testconnection1(inputs)
});
export { smtp_testconnection1 as "smtp.testConnection" }
/**
* | output |
* | --- |
* | "Connection OK - the server accepted the credentials." |
*
* @param {Smtp_Connectionok1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const smtp_connectionok1 = /** @type {((inputs?: Smtp_Connectionok1Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Smtp_Connectionok1Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return __id.smtp_connectionok1(inputs)
	return __en.smtp_connectionok1(inputs)
});
export { smtp_connectionok1 as "smtp.connectionOk" }
/**
* | output |
* | --- |
* | "Connected - the server accepted these credentials." |
*
* @param {Smtp_ConnectedInputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const smtp_connected = /** @type {((inputs?: Smtp_ConnectedInputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Smtp_ConnectedInputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return __id.smtp_connected(inputs)
	return __en.smtp_connected(inputs)
});
export { smtp_connected as "smtp.connected" }
/**
* | output |
* | --- |
* | "Connection failed." |
*
* @param {Smtp_Connectionfailed1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const smtp_connectionfailed1 = /** @type {((inputs?: Smtp_Connectionfailed1Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Smtp_Connectionfailed1Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return __id.smtp_connectionfailed1(inputs)
	return __en.smtp_connectionfailed1(inputs)
});
export { smtp_connectionfailed1 as "smtp.connectionFailed" }
/**
* | output |
* | --- |
* | "not set" |
*
* @param {Smtp_Passwordnotset2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const smtp_passwordnotset2 = /** @type {((inputs?: Smtp_Passwordnotset2Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Smtp_Passwordnotset2Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return __id.smtp_passwordnotset2(inputs)
	return __en.smtp_passwordnotset2(inputs)
});
export { smtp_passwordnotset2 as "smtp.passwordNotSet" }
/**
* | output |
* | --- |
* | "Add SMTP profile" |
*
* @param {Smtp_Addprofiletitle2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const smtp_addprofiletitle2 = /** @type {((inputs?: Smtp_Addprofiletitle2Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Smtp_Addprofiletitle2Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return __id.smtp_addprofiletitle2(inputs)
	return __en.smtp_addprofiletitle2(inputs)
});
export { smtp_addprofiletitle2 as "smtp.addProfileTitle" }
/**
* | output |
* | --- |
* | "Edit \"{name}\"" |
*
* @param {Smtp_Editprofiletitle2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const smtp_editprofiletitle2 = /** @type {((inputs: Smtp_Editprofiletitle2Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Smtp_Editprofiletitle2Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return __id.smtp_editprofiletitle2(inputs)
	return __en.smtp_editprofiletitle2(inputs)
});
export { smtp_editprofiletitle2 as "smtp.editProfileTitle" }
/**
* | output |
* | --- |
* | "Save your SMTP server details to reuse in every campaign." |
*
* @param {Smtp_Createhint1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const smtp_createhint1 = /** @type {((inputs?: Smtp_Createhint1Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Smtp_Createhint1Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return __id.smtp_createhint1(inputs)
	return __en.smtp_createhint1(inputs)
});
export { smtp_createhint1 as "smtp.createHint" }
/**
* | output |
* | --- |
* | "The stored password is never shown; leave the field blank to keep it." |
*
* @param {Smtp_Edithint1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const smtp_edithint1 = /** @type {((inputs?: Smtp_Edithint1Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Smtp_Edithint1Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return __id.smtp_edithint1(inputs)
	return __en.smtp_edithint1(inputs)
});
export { smtp_edithint1 as "smtp.editHint" }
/**
* | output |
* | --- |
* | "Profile name" |
*
* @param {Smtp_Profilename1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const smtp_profilename1 = /** @type {((inputs?: Smtp_Profilename1Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Smtp_Profilename1Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return __id.smtp_profilename1(inputs)
	return __en.smtp_profilename1(inputs)
});
export { smtp_profilename1 as "smtp.profileName" }
/**
* | output |
* | --- |
* | "SMTP host" |
*
* @param {Smtp_Smtphost1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const smtp_smtphost1 = /** @type {((inputs?: Smtp_Smtphost1Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Smtp_Smtphost1Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return __id.smtp_smtphost1(inputs)
	return __en.smtp_smtphost1(inputs)
});
export { smtp_smtphost1 as "smtp.smtpHost" }
/**
* | output |
* | --- |
* | "Port" |
*
* @param {Smtp_PortInputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const smtp_port = /** @type {((inputs?: Smtp_PortInputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Smtp_PortInputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return __id.smtp_port(inputs)
	return __en.smtp_port(inputs)
});
export { smtp_port as "smtp.port" }
/**
* | output |
* | --- |
* | "Implicit TLS" |
*
* @param {Smtp_Implicittls1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const smtp_implicittls1 = /** @type {((inputs?: Smtp_Implicittls1Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Smtp_Implicittls1Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return __id.smtp_implicittls1(inputs)
	return __en.smtp_implicittls1(inputs)
});
export { smtp_implicittls1 as "smtp.implicitTls" }
/**
* | output |
* | --- |
* | "STARTTLS" |
*
* @param {Smtp_StarttlsInputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const smtp_starttls = /** @type {((inputs?: Smtp_StarttlsInputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Smtp_StarttlsInputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return __id.smtp_starttls(inputs)
	return __en.smtp_starttls(inputs)
});
export { smtp_starttls as "smtp.starttls" }
/**
* | output |
* | --- |
* | "Username" |
*
* @param {Smtp_UsernameInputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const smtp_username = /** @type {((inputs?: Smtp_UsernameInputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Smtp_UsernameInputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return __id.smtp_username(inputs)
	return __en.smtp_username(inputs)
});
export { smtp_username as "smtp.username" }
/**
* | output |
* | --- |
* | "App password" |
*
* @param {Smtp_Apppassword1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const smtp_apppassword1 = /** @type {((inputs?: Smtp_Apppassword1Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Smtp_Apppassword1Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return __id.smtp_apppassword1(inputs)
	return __en.smtp_apppassword1(inputs)
});
export { smtp_apppassword1 as "smtp.appPassword" }
/**
* | output |
* | --- |
* | "Leave blank to keep the current one" |
*
* @param {Smtp_Leaveblanktokeep3Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const smtp_leaveblanktokeep3 = /** @type {((inputs?: Smtp_Leaveblanktokeep3Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Smtp_Leaveblanktokeep3Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return __id.smtp_leaveblanktokeep3(inputs)
	return __en.smtp_leaveblanktokeep3(inputs)
});
export { smtp_leaveblanktokeep3 as "smtp.leaveBlankToKeep" }
/**
* | output |
* | --- |
* | "Gmail: generate a 16-character app password with 2-step verification enabled." |
*
* @param {Smtp_Gmailapppasswordhint3Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const smtp_gmailapppasswordhint3 = /** @type {((inputs?: Smtp_Gmailapppasswordhint3Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Smtp_Gmailapppasswordhint3Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return __id.smtp_gmailapppasswordhint3(inputs)
	return __en.smtp_gmailapppasswordhint3(inputs)
});
export { smtp_gmailapppasswordhint3 as "smtp.gmailAppPasswordHint" }
/**
* | output |
* | --- |
* | "Save profile" |
*
* @param {Smtp_Saveprofile1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const smtp_saveprofile1 = /** @type {((inputs?: Smtp_Saveprofile1Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Smtp_Saveprofile1Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return __id.smtp_saveprofile1(inputs)
	return __en.smtp_saveprofile1(inputs)
});
export { smtp_saveprofile1 as "smtp.saveProfile" }
/**
* | output |
* | --- |
* | "Save changes" |
*
* @param {Smtp_Savechanges1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const smtp_savechanges1 = /** @type {((inputs?: Smtp_Savechanges1Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Smtp_Savechanges1Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return __id.smtp_savechanges1(inputs)
	return __en.smtp_savechanges1(inputs)
});
export { smtp_savechanges1 as "smtp.saveChanges" }
/**
* | output |
* | --- |
* | "Delete \"{name}\"?" |
*
* @param {Smtp_Deleteprofiletitle2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const smtp_deleteprofiletitle2 = /** @type {((inputs: Smtp_Deleteprofiletitle2Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Smtp_Deleteprofiletitle2Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return __id.smtp_deleteprofiletitle2(inputs)
	return __en.smtp_deleteprofiletitle2(inputs)
});
export { smtp_deleteprofiletitle2 as "smtp.deleteProfileTitle" }
/**
* | output |
* | --- |
* | "The profile and its stored password are removed from the app." |
*
* @param {Smtp_Deleteprofiledescription2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const smtp_deleteprofiledescription2 = /** @type {((inputs?: Smtp_Deleteprofiledescription2Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Smtp_Deleteprofiledescription2Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return __id.smtp_deleteprofiledescription2(inputs)
	return __en.smtp_deleteprofiledescription2(inputs)
});
export { smtp_deleteprofiledescription2 as "smtp.deleteProfileDescription" }
/**
* | output |
* | --- |
* | "password" |
*
* @param {Smtp_Passwordlabel1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const smtp_passwordlabel1 = /** @type {((inputs?: Smtp_Passwordlabel1Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Smtp_Passwordlabel1Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return __id.smtp_passwordlabel1(inputs)
	return __en.smtp_passwordlabel1(inputs)
});
export { smtp_passwordlabel1 as "smtp.passwordLabel" }
/**
* | output |
* | --- |
* | "Compose" |
*
* @param {Compose_TitleInputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const compose_title = /** @type {((inputs?: Compose_TitleInputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Compose_TitleInputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return __id.compose_title(inputs)
	return __en.compose_title(inputs)
});
export { compose_title as "compose.title" }
/**
* | output |
* | --- |
* | "Pick who receives the documents, write the message, and send the emails." |
*
* @param {Compose_DescriptionInputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const compose_description = /** @type {((inputs?: Compose_DescriptionInputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Compose_DescriptionInputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return __id.compose_description(inputs)
	return __en.compose_description(inputs)
});
export { compose_description as "compose.description" }
/**
* | output |
* | --- |
* | "Recipients" |
*
* @param {Compose_Steprecipients1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const compose_steprecipients1 = /** @type {((inputs?: Compose_Steprecipients1Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Compose_Steprecipients1Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return __id.compose_steprecipients1(inputs)
	return __en.compose_steprecipients1(inputs)
});
export { compose_steprecipients1 as "compose.stepRecipients" }
/**
* | output |
* | --- |
* | "Template" |
*
* @param {Compose_Steptemplate1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const compose_steptemplate1 = /** @type {((inputs?: Compose_Steptemplate1Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Compose_Steptemplate1Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return __id.compose_steptemplate1(inputs)
	return __en.compose_steptemplate1(inputs)
});
export { compose_steptemplate1 as "compose.stepTemplate" }
/**
* | output |
* | --- |
* | "Message" |
*
* @param {Compose_Stepmessage1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const compose_stepmessage1 = /** @type {((inputs?: Compose_Stepmessage1Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Compose_Stepmessage1Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return __id.compose_stepmessage1(inputs)
	return __en.compose_stepmessage1(inputs)
});
export { compose_stepmessage1 as "compose.stepMessage" }
/**
* | output |
* | --- |
* | "SMTP" |
*
* @param {Compose_Stepsmtp1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const compose_stepsmtp1 = /** @type {((inputs?: Compose_Stepsmtp1Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Compose_Stepsmtp1Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return __id.compose_stepsmtp1(inputs)
	return __en.compose_stepsmtp1(inputs)
});
export { compose_stepsmtp1 as "compose.stepSmtp" }
/**
* | output |
* | --- |
* | "Generate & Review" |
*
* @param {Compose_Stepgenerate1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const compose_stepgenerate1 = /** @type {((inputs?: Compose_Stepgenerate1Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Compose_Stepgenerate1Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return __id.compose_stepgenerate1(inputs)
	return __en.compose_stepgenerate1(inputs)
});
export { compose_stepgenerate1 as "compose.stepGenerate" }
/**
* | output |
* | --- |
* | "Send" |
*
* @param {Compose_Stepsend1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const compose_stepsend1 = /** @type {((inputs?: Compose_Stepsend1Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Compose_Stepsend1Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return __id.compose_stepsend1(inputs)
	return __en.compose_stepsend1(inputs)
});
export { compose_stepsend1 as "compose.stepSend" }
/**
* | output |
* | --- |
* | "{count} recipients, data covers all slots" |
*
* @param {Compose_Datacoversallslots3Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const compose_datacoversallslots3 = /** @type {((inputs: Compose_Datacoversallslots3Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Compose_Datacoversallslots3Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return __id.compose_datacoversallslots3(inputs)
	return __en.compose_datacoversallslots3(inputs)
});
export { compose_datacoversallslots3 as "compose.dataCoversAllSlots" }
/**
* | output |
* | --- |
* | "Unknown slot: {slot}" |
*
* @param {Compose_Unknownslotfooter2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const compose_unknownslotfooter2 = /** @type {((inputs: Compose_Unknownslotfooter2Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Compose_Unknownslotfooter2Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return __id.compose_unknownslotfooter2(inputs)
	return __en.compose_unknownslotfooter2(inputs)
});
export { compose_unknownslotfooter2 as "compose.unknownSlotFooter" }
/**
* | output |
* | --- |
* | "Write a subject to continue" |
*
* @param {Compose_Writesubjecttocontinue3Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const compose_writesubjecttocontinue3 = /** @type {((inputs?: Compose_Writesubjecttocontinue3Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Compose_Writesubjecttocontinue3Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return __id.compose_writesubjecttocontinue3(inputs)
	return __en.compose_writesubjecttocontinue3(inputs)
});
export { compose_writesubjecttocontinue3 as "compose.writeSubjectToContinue" }
/**
* | output |
* | --- |
* | "Write an email body to continue" |
*
* @param {Compose_Writebodytocontinue3Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const compose_writebodytocontinue3 = /** @type {((inputs?: Compose_Writebodytocontinue3Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Compose_Writebodytocontinue3Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return __id.compose_writebodytocontinue3(inputs)
	return __en.compose_writebodytocontinue3(inputs)
});
export { compose_writebodytocontinue3 as "compose.writeBodyToContinue" }
/**
* | output |
* | --- |
* | "Message looks good" |
*
* @param {Compose_Messagelooksgood2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const compose_messagelooksgood2 = /** @type {((inputs?: Compose_Messagelooksgood2Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Compose_Messagelooksgood2Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return __id.compose_messagelooksgood2(inputs)
	return __en.compose_messagelooksgood2(inputs)
});
export { compose_messagelooksgood2 as "compose.messageLooksGood" }
/**
* | output |
* | --- |
* | "Connection details ready" |
*
* @param {Compose_Connectiondetailsready2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const compose_connectiondetailsready2 = /** @type {((inputs?: Compose_Connectiondetailsready2Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Compose_Connectiondetailsready2Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return __id.compose_connectiondetailsready2(inputs)
	return __en.compose_connectiondetailsready2(inputs)
});
export { compose_connectiondetailsready2 as "compose.connectionDetailsReady" }
/**
* | output |
* | --- |
* | "Complete the SMTP and sender details" |
*
* @param {Compose_Completesmtpdetails2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const compose_completesmtpdetails2 = /** @type {((inputs?: Compose_Completesmtpdetails2Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Compose_Completesmtpdetails2Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return __id.compose_completesmtpdetails2(inputs)
	return __en.compose_completesmtpdetails2(inputs)
});
export { compose_completesmtpdetails2 as "compose.completeSmtpDetails" }
/**
* | output |
* | --- |
* | "{generated} generated, {failed} failed" |
*
* @param {Compose_Generatedfailedfooter2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const compose_generatedfailedfooter2 = /** @type {((inputs: Compose_Generatedfailedfooter2Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Compose_Generatedfailedfooter2Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return __id.compose_generatedfailedfooter2(inputs)
	return __en.compose_generatedfailedfooter2(inputs)
});
export { compose_generatedfailedfooter2 as "compose.generatedFailedFooter" }
/**
* | output |
* | --- |
* | "Re-enter the app password to send again - passwords never leave this app." |
*
* @param {Compose_Prefillreenterpassword2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const compose_prefillreenterpassword2 = /** @type {((inputs?: Compose_Prefillreenterpassword2Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Compose_Prefillreenterpassword2Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return __id.compose_prefillreenterpassword2(inputs)
	return __en.compose_prefillreenterpassword2(inputs)
});
export { compose_prefillreenterpassword2 as "compose.prefillReenterPassword" }
/**
* | output |
* | --- |
* | "Search recipients" |
*
* @param {Compose_Searchrecipients1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const compose_searchrecipients1 = /** @type {((inputs?: Compose_Searchrecipients1Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Compose_Searchrecipients1Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return __id.compose_searchrecipients1(inputs)
	return __en.compose_searchrecipients1(inputs)
});
export { compose_searchrecipients1 as "compose.searchRecipients" }
/**
* | output |
* | --- |
* | "Search name, email, or any field…" |
*
* @param {Compose_Searchplaceholder1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const compose_searchplaceholder1 = /** @type {((inputs?: Compose_Searchplaceholder1Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Compose_Searchplaceholder1Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return __id.compose_searchplaceholder1(inputs)
	return __en.compose_searchplaceholder1(inputs)
});
export { compose_searchplaceholder1 as "compose.searchPlaceholder" }
/**
* | output |
* | --- |
* | "Filter by import batch" |
*
* @param {Compose_Filterbybatch2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const compose_filterbybatch2 = /** @type {((inputs?: Compose_Filterbybatch2Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Compose_Filterbybatch2Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return __id.compose_filterbybatch2(inputs)
	return __en.compose_filterbybatch2(inputs)
});
export { compose_filterbybatch2 as "compose.filterByBatch" }
/**
* | output |
* | --- |
* | "All batches" |
*
* @param {Compose_Allbatches1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const compose_allbatches1 = /** @type {((inputs?: Compose_Allbatches1Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Compose_Allbatches1Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return __id.compose_allbatches1(inputs)
	return __en.compose_allbatches1(inputs)
});
export { compose_allbatches1 as "compose.allBatches" }
/**
* | output |
* | --- |
* | "{count} recipients · {stamp}" |
*
* @param {Compose_Batchoption1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const compose_batchoption1 = /** @type {((inputs: Compose_Batchoption1Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Compose_Batchoption1Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return __id.compose_batchoption1(inputs)
	return __en.compose_batchoption1(inputs)
});
export { compose_batchoption1 as "compose.batchOption" }
/**
* | output |
* | --- |
* | "Select all {total} recipients matching the current filter" |
*
* @param {Compose_Selectallmatchingtitle3Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const compose_selectallmatchingtitle3 = /** @type {((inputs: Compose_Selectallmatchingtitle3Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Compose_Selectallmatchingtitle3Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return __id.compose_selectallmatchingtitle3(inputs)
	return __en.compose_selectallmatchingtitle3(inputs)
});
export { compose_selectallmatchingtitle3 as "compose.selectAllMatchingTitle" }
/**
* | output |
* | --- |
* | "Select all {total}" |
*
* @param {Compose_Selectallcount2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const compose_selectallcount2 = /** @type {((inputs: Compose_Selectallcount2Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Compose_Selectallcount2Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return __id.compose_selectallcount2(inputs)
	return __en.compose_selectallcount2(inputs)
});
export { compose_selectallcount2 as "compose.selectAllCount" }
/**
* | output |
* | --- |
* | "Could not load recipients." |
*
* @param {Compose_Couldnotloadrecipients3Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const compose_couldnotloadrecipients3 = /** @type {((inputs?: Compose_Couldnotloadrecipients3Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Compose_Couldnotloadrecipients3Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return __id.compose_couldnotloadrecipients3(inputs)
	return __en.compose_couldnotloadrecipients3(inputs)
});
export { compose_couldnotloadrecipients3 as "compose.couldNotLoadRecipients" }
/**
* | output |
* | --- |
* | "No recipients yet" |
*
* @param {Compose_Norecipientsyet2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const compose_norecipientsyet2 = /** @type {((inputs?: Compose_Norecipientsyet2Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Compose_Norecipientsyet2Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return __id.compose_norecipientsyet2(inputs)
	return __en.compose_norecipientsyet2(inputs)
});
export { compose_norecipientsyet2 as "compose.noRecipientsYet" }
/**
* | output |
* | --- |
* | "No recipients match this filter" |
*
* @param {Compose_Norecipientsmatchfilter3Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const compose_norecipientsmatchfilter3 = /** @type {((inputs?: Compose_Norecipientsmatchfilter3Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Compose_Norecipientsmatchfilter3Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return __id.compose_norecipientsmatchfilter3(inputs)
	return __en.compose_norecipientsmatchfilter3(inputs)
});
export { compose_norecipientsmatchfilter3 as "compose.noRecipientsMatchFilter" }
/**
* | output |
* | --- |
* | "Import an Excel file first, then come back here to build a campaign." |
*
* @param {Compose_Norecipientshint2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const compose_norecipientshint2 = /** @type {((inputs?: Compose_Norecipientshint2Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Compose_Norecipientshint2Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return __id.compose_norecipientshint2(inputs)
	return __en.compose_norecipientshint2(inputs)
});
export { compose_norecipientshint2 as "compose.noRecipientsHint" }
/**
* | output |
* | --- |
* | "Go to Import" |
*
* @param {Compose_Gotoimport2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const compose_gotoimport2 = /** @type {((inputs?: Compose_Gotoimport2Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Compose_Gotoimport2Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return __id.compose_gotoimport2(inputs)
	return __en.compose_gotoimport2(inputs)
});
export { compose_gotoimport2 as "compose.goToImport" }
/**
* | output |
* | --- |
* | "Try a different search or batch filter." |
*
* @param {Compose_Trydifferentfilter2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const compose_trydifferentfilter2 = /** @type {((inputs?: Compose_Trydifferentfilter2Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Compose_Trydifferentfilter2Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return __id.compose_trydifferentfilter2(inputs)
	return __en.compose_trydifferentfilter2(inputs)
});
export { compose_trydifferentfilter2 as "compose.tryDifferentFilter" }
/**
* | output |
* | --- |
* | "Select all on this page" |
*
* @param {Compose_Selectallonpage3Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const compose_selectallonpage3 = /** @type {((inputs?: Compose_Selectallonpage3Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Compose_Selectallonpage3Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return __id.compose_selectallonpage3(inputs)
	return __en.compose_selectallonpage3(inputs)
});
export { compose_selectallonpage3 as "compose.selectAllOnPage" }
/**
* | output |
* | --- |
* | "Name" |
*
* @param {Compose_NameInputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const compose_name = /** @type {((inputs?: Compose_NameInputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Compose_NameInputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return __id.compose_name(inputs)
	return __en.compose_name(inputs)
});
export { compose_name as "compose.name" }
/**
* | output |
* | --- |
* | "Email" |
*
* @param {Compose_EmailInputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const compose_email = /** @type {((inputs?: Compose_EmailInputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Compose_EmailInputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return __id.compose_email(inputs)
	return __en.compose_email(inputs)
});
export { compose_email as "compose.email" }
/**
* | output |
* | --- |
* | "Phone" |
*
* @param {Compose_PhoneInputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const compose_phone = /** @type {((inputs?: Compose_PhoneInputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Compose_PhoneInputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return __id.compose_phone(inputs)
	return __en.compose_phone(inputs)
});
export { compose_phone as "compose.phone" }
/**
* | output |
* | --- |
* | "Select {name}" |
*
* @param {Compose_Selectrecipient1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const compose_selectrecipient1 = /** @type {((inputs: Compose_Selectrecipient1Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Compose_Selectrecipient1Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return __id.compose_selectrecipient1(inputs)
	return __en.compose_selectrecipient1(inputs)
});
export { compose_selectrecipient1 as "compose.selectRecipient" }
/**
* | output |
* | --- |
* | "{selected} selected · {total} matching" |
*
* @param {Compose_Selectioncount1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const compose_selectioncount1 = /** @type {((inputs: Compose_Selectioncount1Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Compose_Selectioncount1Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return __id.compose_selectioncount1(inputs)
	return __en.compose_selectioncount1(inputs)
});
export { compose_selectioncount1 as "compose.selectionCount" }
/**
* | output |
* | --- |
* | "Page {page} of {total}" |
*
* @param {Compose_Pageof1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const compose_pageof1 = /** @type {((inputs: Compose_Pageof1Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Compose_Pageof1Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return __id.compose_pageof1(inputs)
	return __en.compose_pageof1(inputs)
});
export { compose_pageof1 as "compose.pageOf" }
/**
* | output |
* | --- |
* | "Letter or certificate template" |
*
* @param {Compose_Templatelabel1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const compose_templatelabel1 = /** @type {((inputs?: Compose_Templatelabel1Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Compose_Templatelabel1Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return __id.compose_templatelabel1(inputs)
	return __en.compose_templatelabel1(inputs)
});
export { compose_templatelabel1 as "compose.templateLabel" }
/**
* | output |
* | --- |
* | "Choose a template…" |
*
* @param {Compose_Choosetemplate1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const compose_choosetemplate1 = /** @type {((inputs?: Compose_Choosetemplate1Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Compose_Choosetemplate1Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return __id.compose_choosetemplate1(inputs)
	return __en.compose_choosetemplate1(inputs)
});
export { compose_choosetemplate1 as "compose.chooseTemplate" }
/**
* | output |
* | --- |
* | "No templates registered yet." |
*
* @param {Compose_Notemplatesregistered2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const compose_notemplatesregistered2 = /** @type {((inputs?: Compose_Notemplatesregistered2Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Compose_Notemplatesregistered2Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return __id.compose_notemplatesregistered2(inputs)
	return __en.compose_notemplatesregistered2(inputs)
});
export { compose_notemplatesregistered2 as "compose.noTemplatesRegistered" }
/**
* | output |
* | --- |
* | "Register a template" |
*
* @param {Compose_Registertemplatelink2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const compose_registertemplatelink2 = /** @type {((inputs?: Compose_Registertemplatelink2Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Compose_Registertemplatelink2Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return __id.compose_registertemplatelink2(inputs)
	return __en.compose_registertemplatelink2(inputs)
});
export { compose_registertemplatelink2 as "compose.registerTemplateLink" }
/**
* | output |
* | --- |
* | "first, then come back." |
*
* @param {Compose_Notemplatesregisteredhint3Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const compose_notemplatesregisteredhint3 = /** @type {((inputs?: Compose_Notemplatesregisteredhint3Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Compose_Notemplatesregisteredhint3Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return __id.compose_notemplatesregisteredhint3(inputs)
	return __en.compose_notemplatesregisteredhint3(inputs)
});
export { compose_notemplatesregisteredhint3 as "compose.noTemplatesRegisteredHint" }
/**
* | output |
* | --- |
* | "Required slots" |
*
* @param {Compose_Requiredslots1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const compose_requiredslots1 = /** @type {((inputs?: Compose_Requiredslots1Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Compose_Requiredslots1Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return __id.compose_requiredslots1(inputs)
	return __en.compose_requiredslots1(inputs)
});
export { compose_requiredslots1 as "compose.requiredSlots" }
/**
* | output |
* | --- |
* | "Output pattern" |
*
* @param {Compose_Outputpattern1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const compose_outputpattern1 = /** @type {((inputs?: Compose_Outputpattern1Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Compose_Outputpattern1Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return __id.compose_outputpattern1(inputs)
	return __en.compose_outputpattern1(inputs)
});
export { compose_outputpattern1 as "compose.outputPattern" }
/**
* | output |
* | --- |
* | "All {count} selected recipients have data for every required slot." |
*
* @param {Compose_Allcovered1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const compose_allcovered1 = /** @type {((inputs: Compose_Allcovered1Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Compose_Allcovered1Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return __id.compose_allcovered1(inputs)
	return __en.compose_allcovered1(inputs)
});
export { compose_allcovered1 as "compose.allCovered" }
/**
* | output |
* | --- |
* | "{missing} of {count} selected recipients are missing data for:" |
*
* @param {Compose_Missingdatasummary2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const compose_missingdatasummary2 = /** @type {((inputs: Compose_Missingdatasummary2Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Compose_Missingdatasummary2Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return __id.compose_missingdatasummary2(inputs)
	return __en.compose_missingdatasummary2(inputs)
});
export { compose_missingdatasummary2 as "compose.missingDataSummary" }
/**
* | output |
* | --- |
* | "Fix the recipients' data or pick another template before continuing - missing slots produce broken PDFs." |
*
* @param {Compose_Missingdatahint2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const compose_missingdatahint2 = /** @type {((inputs?: Compose_Missingdatahint2Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Compose_Missingdatahint2Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return __id.compose_missingdatahint2(inputs)
	return __en.compose_missingdatahint2(inputs)
});
export { compose_missingdatahint2 as "compose.missingDataHint" }
/**
* | output |
* | --- |
* | "Subject" |
*
* @param {Compose_SubjectInputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const compose_subject = /** @type {((inputs?: Compose_SubjectInputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Compose_SubjectInputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return __id.compose_subject(inputs)
	return __en.compose_subject(inputs)
});
export { compose_subject as "compose.subject" }
/**
* | output |
* | --- |
* | "LOA for {name} - {instansi}" |
*
* @param {Compose_Subjectplaceholder1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const compose_subjectplaceholder1 = /** @type {((inputs: Compose_Subjectplaceholder1Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Compose_Subjectplaceholder1Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return __id.compose_subjectplaceholder1(inputs)
	return __en.compose_subjectplaceholder1(inputs)
});
export { compose_subjectplaceholder1 as "compose.subjectPlaceholder" }
/**
* | output |
* | --- |
* | "HTML body - type { to insert a recipient field" |
*
* @param {Compose_Bodylabel1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const compose_bodylabel1 = /** @type {((inputs?: Compose_Bodylabel1Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Compose_Bodylabel1Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return __id.compose_bodylabel1(inputs)
	return __en.compose_bodylabel1(inputs)
});
export { compose_bodylabel1 as "compose.bodyLabel" }
/**
* | output |
* | --- |
* | "<p>Dear {name},</p> <p>Congratulations on your scholarship.</p>" |
*
* @param {Compose_Bodyplaceholder1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const compose_bodyplaceholder1 = /** @type {((inputs: Compose_Bodyplaceholder1Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Compose_Bodyplaceholder1Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return __id.compose_bodyplaceholder1(inputs)
	return __en.compose_bodyplaceholder1(inputs)
});
export { compose_bodyplaceholder1 as "compose.bodyPlaceholder" }
/**
* | output |
* | --- |
* | "No selected recipient has this field. Fix the placeholder or the recipients' data - sending would fail for everyone." |
*
* @param {Compose_Unknownslothint2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const compose_unknownslothint2 = /** @type {((inputs?: Compose_Unknownslothint2Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Compose_Unknownslothint2Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return __id.compose_unknownslothint2(inputs)
	return __en.compose_unknownslothint2(inputs)
});
export { compose_unknownslothint2 as "compose.unknownSlotHint" }
/**
* | output |
* | --- |
* | "Some recipients are missing data for: {list}" |
*
* @param {Compose_Missingslottitle2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const compose_missingslottitle2 = /** @type {((inputs: Compose_Missingslottitle2Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Compose_Missingslottitle2Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return __id.compose_missingslottitle2(inputs)
	return __en.compose_missingslottitle2(inputs)
});
export { compose_missingslottitle2 as "compose.missingSlotTitle" }
/**
* | output |
* | --- |
* | "Those recipients will fail at send time while the rest of the batch continues. Fix their data to avoid failures." |
*
* @param {Compose_Missingslothint2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const compose_missingslothint2 = /** @type {((inputs?: Compose_Missingslothint2Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Compose_Missingslothint2Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return __id.compose_missingslothint2(inputs)
	return __en.compose_missingslothint2(inputs)
});
export { compose_missingslothint2 as "compose.missingSlotHint" }
/**
* | output |
* | --- |
* | "Live preview" |
*
* @param {Compose_Livepreview1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const compose_livepreview1 = /** @type {((inputs?: Compose_Livepreview1Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Compose_Livepreview1Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return __id.compose_livepreview1(inputs)
	return __en.compose_livepreview1(inputs)
});
export { compose_livepreview1 as "compose.livePreview" }
/**
* | output |
* | --- |
* | "Preview for {name}" |
*
* @param {Compose_Previewfor1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const compose_previewfor1 = /** @type {((inputs: Compose_Previewfor1Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Compose_Previewfor1Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return __id.compose_previewfor1(inputs)
	return __en.compose_previewfor1(inputs)
});
export { compose_previewfor1 as "compose.previewFor" }
/**
* | output |
* | --- |
* | "Email connection" |
*
* @param {Compose_Emailconnection1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const compose_emailconnection1 = /** @type {((inputs?: Compose_Emailconnection1Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Compose_Emailconnection1Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return __id.compose_emailconnection1(inputs)
	return __en.compose_emailconnection1(inputs)
});
export { compose_emailconnection1 as "compose.emailConnection" }
/**
* | output |
* | --- |
* | "Saved profile" |
*
* @param {Compose_Savedprofile1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const compose_savedprofile1 = /** @type {((inputs?: Compose_Savedprofile1Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Compose_Savedprofile1Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return __id.compose_savedprofile1(inputs)
	return __en.compose_savedprofile1(inputs)
});
export { compose_savedprofile1 as "compose.savedProfile" }
/**
* | output |
* | --- |
* | "Enter details (this job only)" |
*
* @param {Compose_Enterdetails1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const compose_enterdetails1 = /** @type {((inputs?: Compose_Enterdetails1Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Compose_Enterdetails1Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return __id.compose_enterdetails1(inputs)
	return __en.compose_enterdetails1(inputs)
});
export { compose_enterdetails1 as "compose.enterDetails" }
/**
* | output |
* | --- |
* | "Choose a profile…" |
*
* @param {Compose_Chooseprofile1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const compose_chooseprofile1 = /** @type {((inputs?: Compose_Chooseprofile1Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Compose_Chooseprofile1Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return __id.compose_chooseprofile1(inputs)
	return __en.compose_chooseprofile1(inputs)
});
export { compose_chooseprofile1 as "compose.chooseProfile" }
/**
* | output |
* | --- |
* | "No saved profiles yet - switch to \"Enter details\" and use \"Save as profile\", or add one in" |
*
* @param {Compose_Nosavedprofileshint3Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const compose_nosavedprofileshint3 = /** @type {((inputs?: Compose_Nosavedprofileshint3Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Compose_Nosavedprofileshint3Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return __id.compose_nosavedprofileshint3(inputs)
	return __en.compose_nosavedprofileshint3(inputs)
});
export { compose_nosavedprofileshint3 as "compose.noSavedProfilesHint" }
/**
* | output |
* | --- |
* | "Settings" |
*
* @param {Compose_Settingslink1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const compose_settingslink1 = /** @type {((inputs?: Compose_Settingslink1Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Compose_Settingslink1Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return __id.compose_settingslink1(inputs)
	return __en.compose_settingslink1(inputs)
});
export { compose_settingslink1 as "compose.settingsLink" }
/**
* | output |
* | --- |
* | "Host" |
*
* @param {Compose_HostInputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const compose_host = /** @type {((inputs?: Compose_HostInputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Compose_HostInputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return __id.compose_host(inputs)
	return __en.compose_host(inputs)
});
export { compose_host as "compose.host" }
/**
* | output |
* | --- |
* | "Port (465 = implicit TLS, else STARTTLS)" |
*
* @param {Compose_Portlabel1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const compose_portlabel1 = /** @type {((inputs?: Compose_Portlabel1Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Compose_Portlabel1Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return __id.compose_portlabel1(inputs)
	return __en.compose_portlabel1(inputs)
});
export { compose_portlabel1 as "compose.portLabel" }
/**
* | output |
* | --- |
* | "Username (email address)" |
*
* @param {Compose_Usernamelabel1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const compose_usernamelabel1 = /** @type {((inputs?: Compose_Usernamelabel1Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Compose_Usernamelabel1Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return __id.compose_usernamelabel1(inputs)
	return __en.compose_usernamelabel1(inputs)
});
export { compose_usernamelabel1 as "compose.usernameLabel" }
/**
* | output |
* | --- |
* | "App password" |
*
* @param {Compose_Apppasswordlabel2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const compose_apppasswordlabel2 = /** @type {((inputs?: Compose_Apppasswordlabel2Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Compose_Apppasswordlabel2Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return __id.compose_apppasswordlabel2(inputs)
	return __en.compose_apppasswordlabel2(inputs)
});
export { compose_apppasswordlabel2 as "compose.appPasswordLabel" }
/**
* | output |
* | --- |
* | "Save as profile" |
*
* @param {Compose_Saveasprofile2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const compose_saveasprofile2 = /** @type {((inputs?: Compose_Saveasprofile2Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Compose_Saveasprofile2Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return __id.compose_saveasprofile2(inputs)
	return __en.compose_saveasprofile2(inputs)
});
export { compose_saveasprofile2 as "compose.saveAsProfile" }
/**
* | output |
* | --- |
* | "Profile name, e.g. Gmail utama" |
*
* @param {Compose_Profilenameplaceholder2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const compose_profilenameplaceholder2 = /** @type {((inputs?: Compose_Profilenameplaceholder2Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Compose_Profilenameplaceholder2Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return __id.compose_profilenameplaceholder2(inputs)
	return __en.compose_profilenameplaceholder2(inputs)
});
export { compose_profilenameplaceholder2 as "compose.profileNamePlaceholder" }
/**
* | output |
* | --- |
* | "Test Connection" |
*
* @param {Compose_Testconnectionbutton2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const compose_testconnectionbutton2 = /** @type {((inputs?: Compose_Testconnectionbutton2Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Compose_Testconnectionbutton2Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return __id.compose_testconnectionbutton2(inputs)
	return __en.compose_testconnectionbutton2(inputs)
});
export { compose_testconnectionbutton2 as "compose.testConnectionButton" }
/**
* | output |
* | --- |
* | "Sender identity" |
*
* @param {Compose_Senderidentity1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const compose_senderidentity1 = /** @type {((inputs?: Compose_Senderidentity1Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Compose_Senderidentity1Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return __id.compose_senderidentity1(inputs)
	return __en.compose_senderidentity1(inputs)
});
export { compose_senderidentity1 as "compose.senderIdentity" }
/**
* | output |
* | --- |
* | "Sender name" |
*
* @param {Compose_Sendername1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const compose_sendername1 = /** @type {((inputs?: Compose_Sendername1Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Compose_Sendername1Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return __id.compose_sendername1(inputs)
	return __en.compose_sendername1(inputs)
});
export { compose_sendername1 as "compose.senderName" }
/**
* | output |
* | --- |
* | "Sender address" |
*
* @param {Compose_Senderaddress1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const compose_senderaddress1 = /** @type {((inputs?: Compose_Senderaddress1Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Compose_Senderaddress1Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return __id.compose_senderaddress1(inputs)
	return __en.compose_senderaddress1(inputs)
});
export { compose_senderaddress1 as "compose.senderAddress" }
/**
* | output |
* | --- |
* | "Sending rate" |
*
* @param {Compose_Sendingrate1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const compose_sendingrate1 = /** @type {((inputs?: Compose_Sendingrate1Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Compose_Sendingrate1Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return __id.compose_sendingrate1(inputs)
	return __en.compose_sendingrate1(inputs)
});
export { compose_sendingrate1 as "compose.sendingRate" }
/**
* | output |
* | --- |
* | "{ms} ms / email" |
*
* @param {Compose_Sendingratems2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const compose_sendingratems2 = /** @type {((inputs: Compose_Sendingratems2Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Compose_Sendingratems2Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return __id.compose_sendingratems2(inputs)
	return __en.compose_sendingratems2(inputs)
});
export { compose_sendingratems2 as "compose.sendingRateMs" }
/**
* | output |
* | --- |
* | "Applies live - a running job picks up changes without restarting." |
*
* @param {Compose_Sendingratehint2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const compose_sendingratehint2 = /** @type {((inputs?: Compose_Sendingratehint2Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Compose_Sendingratehint2Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return __id.compose_sendingratehint2(inputs)
	return __en.compose_sendingratehint2(inputs)
});
export { compose_sendingratehint2 as "compose.sendingRateHint" }
/**
* | output |
* | --- |
* | "Generation failed." |
*
* @param {Compose_Generationfailed1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const compose_generationfailed1 = /** @type {((inputs?: Compose_Generationfailed1Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Compose_Generationfailed1Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return __id.compose_generationfailed1(inputs)
	return __en.compose_generationfailed1(inputs)
});
export { compose_generationfailed1 as "compose.generationFailed" }
/**
* | output |
* | --- |
* | "Connection failed." |
*
* @param {Compose_Connectionfailed1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const compose_connectionfailed1 = /** @type {((inputs?: Compose_Connectionfailed1Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Compose_Connectionfailed1Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return __id.compose_connectionfailed1(inputs)
	return __en.compose_connectionfailed1(inputs)
});
export { compose_connectionfailed1 as "compose.connectionFailed" }
/**
* | output |
* | --- |
* | "Go back and choose a template first." |
*
* @param {Compose_Choosetemplatefirst2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const compose_choosetemplatefirst2 = /** @type {((inputs?: Compose_Choosetemplatefirst2Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Compose_Choosetemplatefirst2Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return __id.compose_choosetemplatefirst2(inputs)
	return __en.compose_choosetemplatefirst2(inputs)
});
export { compose_choosetemplatefirst2 as "compose.chooseTemplateFirst" }
/**
* | output |
* | --- |
* | "Campaign summary" |
*
* @param {Compose_Campaignsummary1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const compose_campaignsummary1 = /** @type {((inputs?: Compose_Campaignsummary1Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Compose_Campaignsummary1Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return __id.compose_campaignsummary1(inputs)
	return __en.compose_campaignsummary1(inputs)
});
export { compose_campaignsummary1 as "compose.campaignSummary" }
/**
* | output |
* | --- |
* | "Recipients" |
*
* @param {Compose_RecipientsInputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const compose_recipients = /** @type {((inputs?: Compose_RecipientsInputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Compose_RecipientsInputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return __id.compose_recipients(inputs)
	return __en.compose_recipients(inputs)
});
export { compose_recipients as "compose.recipients" }
/**
* | output |
* | --- |
* | "Template" |
*
* @param {Compose_TemplateInputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const compose_template = /** @type {((inputs?: Compose_TemplateInputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Compose_TemplateInputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return __id.compose_template(inputs)
	return __en.compose_template(inputs)
});
export { compose_template as "compose.template" }
/**
* | output |
* | --- |
* | "Output folder" |
*
* @param {Compose_Outputfolder1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const compose_outputfolder1 = /** @type {((inputs?: Compose_Outputfolder1Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Compose_Outputfolder1Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return __id.compose_outputfolder1(inputs)
	return __en.compose_outputfolder1(inputs)
});
export { compose_outputfolder1 as "compose.outputFolder" }
/**
* | output |
* | --- |
* | "One PDF per recipient, named by the template's output pattern. Failures are reported per recipient while the rest of the batch continues." |
*
* @param {Compose_Campaignsummaryhint2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const compose_campaignsummaryhint2 = /** @type {((inputs?: Compose_Campaignsummaryhint2Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Compose_Campaignsummaryhint2Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return __id.compose_campaignsummaryhint2(inputs)
	return __en.compose_campaignsummaryhint2(inputs)
});
export { compose_campaignsummaryhint2 as "compose.campaignSummaryHint" }
/**
* | output |
* | --- |
* | "Generate PDFs" |
*
* @param {Compose_Generatepdfs1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const compose_generatepdfs1 = /** @type {((inputs?: Compose_Generatepdfs1Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Compose_Generatepdfs1Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return __id.compose_generatepdfs1(inputs)
	return __en.compose_generatepdfs1(inputs)
});
export { compose_generatepdfs1 as "compose.generatePdfs" }
/**
* | output |
* | --- |
* | "Generating…" |
*
* @param {Compose_GeneratingInputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const compose_generating = /** @type {((inputs?: Compose_GeneratingInputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Compose_GeneratingInputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return __id.compose_generating(inputs)
	return __en.compose_generating(inputs)
});
export { compose_generating as "compose.generating" }
/**
* | output |
* | --- |
* | "{current} of {total}" |
*
* @param {Compose_Oftotal1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const compose_oftotal1 = /** @type {((inputs: Compose_Oftotal1Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Compose_Oftotal1Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return __id.compose_oftotal1(inputs)
	return __en.compose_oftotal1(inputs)
});
export { compose_oftotal1 as "compose.ofTotal" }
/**
* | output |
* | --- |
* | "{generated} generated · {failed} failed · {pending} pending" |
*
* @param {Compose_Generatedcounts1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const compose_generatedcounts1 = /** @type {((inputs: Compose_Generatedcounts1Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Compose_Generatedcounts1Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return __id.compose_generatedcounts1(inputs)
	return __en.compose_generatedcounts1(inputs)
});
export { compose_generatedcounts1 as "compose.generatedCounts" }
/**
* | output |
* | --- |
* | "Try again" |
*
* @param {Compose_Tryagain1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const compose_tryagain1 = /** @type {((inputs?: Compose_Tryagain1Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Compose_Tryagain1Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return __id.compose_tryagain1(inputs)
	return __en.compose_tryagain1(inputs)
});
export { compose_tryagain1 as "compose.tryAgain" }
/**
* | output |
* | --- |
* | "All {count} PDFs generated." |
*
* @param {Compose_Allgenerated1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const compose_allgenerated1 = /** @type {((inputs: Compose_Allgenerated1Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Compose_Allgenerated1Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return __id.compose_allgenerated1(inputs)
	return __en.compose_allgenerated1(inputs)
});
export { compose_allgenerated1 as "compose.allGenerated" }
/**
* | output |
* | --- |
* | "{generated} generated, {failed} failed. Failed recipients are excluded from the send automatically." |
*
* @param {Compose_Generatedwithfailures2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const compose_generatedwithfailures2 = /** @type {((inputs: Compose_Generatedwithfailures2Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Compose_Generatedwithfailures2Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return __id.compose_generatedwithfailures2(inputs)
	return __en.compose_generatedwithfailures2(inputs)
});
export { compose_generatedwithfailures2 as "compose.generatedWithFailures" }
/**
* | output |
* | --- |
* | "Failed recipients ({count})" |
*
* @param {Compose_Failedrecipientstitle2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const compose_failedrecipientstitle2 = /** @type {((inputs: Compose_Failedrecipientstitle2Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Compose_Failedrecipientstitle2Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return __id.compose_failedrecipientstitle2(inputs)
	return __en.compose_failedrecipientstitle2(inputs)
});
export { compose_failedrecipientstitle2 as "compose.failedRecipientsTitle" }
/**
* | output |
* | --- |
* | "Spot-check" |
*
* @param {Compose_Spotcheck1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const compose_spotcheck1 = /** @type {((inputs?: Compose_Spotcheck1Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Compose_Spotcheck1Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return __id.compose_spotcheck1(inputs)
	return __en.compose_spotcheck1(inputs)
});
export { compose_spotcheck1 as "compose.spotCheck" }
/**
* | output |
* | --- |
* | "{index} of {total}" |
*
* @param {Compose_Spotindex1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const compose_spotindex1 = /** @type {((inputs: Compose_Spotindex1Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Compose_Spotindex1Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return __id.compose_spotindex1(inputs)
	return __en.compose_spotindex1(inputs)
});
export { compose_spotindex1 as "compose.spotIndex" }
/**
* | output |
* | --- |
* | "Loading preview…" |
*
* @param {Compose_Loadingpreview1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const compose_loadingpreview1 = /** @type {((inputs?: Compose_Loadingpreview1Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Compose_Loadingpreview1Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return __id.compose_loadingpreview1(inputs)
	return __en.compose_loadingpreview1(inputs)
});
export { compose_loadingpreview1 as "compose.loadingPreview" }
/**
* | output |
* | --- |
* | "Send summary" |
*
* @param {Compose_Sendsummary1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const compose_sendsummary1 = /** @type {((inputs?: Compose_Sendsummary1Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Compose_Sendsummary1Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return __id.compose_sendsummary1(inputs)
	return __en.compose_sendsummary1(inputs)
});
export { compose_sendsummary1 as "compose.sendSummary" }
/**
* | output |
* | --- |
* | "Sender" |
*
* @param {Compose_SenderInputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const compose_sender = /** @type {((inputs?: Compose_SenderInputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Compose_SenderInputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return __id.compose_sender(inputs)
	return __en.compose_sender(inputs)
});
export { compose_sender as "compose.sender" }
/**
* | output |
* | --- |
* | "Connection" |
*
* @param {Compose_ConnectionInputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const compose_connection = /** @type {((inputs?: Compose_ConnectionInputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Compose_ConnectionInputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return __id.compose_connection(inputs)
	return __en.compose_connection(inputs)
});
export { compose_connection as "compose.connection" }
/**
* | output |
* | --- |
* | "Pacing" |
*
* @param {Compose_PacingInputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const compose_pacing = /** @type {((inputs?: Compose_PacingInputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Compose_PacingInputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return __id.compose_pacing(inputs)
	return __en.compose_pacing(inputs)
});
export { compose_pacing as "compose.pacing" }
/**
* | output |
* | --- |
* | "Attachments" |
*
* @param {Compose_AttachmentsInputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const compose_attachments = /** @type {((inputs?: Compose_AttachmentsInputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Compose_AttachmentsInputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return __id.compose_attachments(inputs)
	return __en.compose_attachments(inputs)
});
export { compose_attachments as "compose.attachments" }
/**
* | output |
* | --- |
* | "{count} generated PDFs" |
*
* @param {Compose_Generatedpdfscount2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const compose_generatedpdfscount2 = /** @type {((inputs: Compose_Generatedpdfscount2Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Compose_Generatedpdfscount2Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return __id.compose_generatedpdfscount2(inputs)
	return __en.compose_generatedpdfscount2(inputs)
});
export { compose_generatedpdfscount2 as "compose.generatedPdfsCount" }
/**
* | output |
* | --- |
* | "The pre-flight checks the SMTP connection and confirms the generated attachments before the first email goes out." |
*
* @param {Compose_Preflighthint1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const compose_preflighthint1 = /** @type {((inputs?: Compose_Preflighthint1Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Compose_Preflighthint1Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return __id.compose_preflighthint1(inputs)
	return __en.compose_preflighthint1(inputs)
});
export { compose_preflighthint1 as "compose.preflightHint" }
/**
* | output |
* | --- |
* | "No recipients have a generated attachment - go back and generate the PDFs first." |
*
* @param {Compose_Nogeneratedattachments2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const compose_nogeneratedattachments2 = /** @type {((inputs?: Compose_Nogeneratedattachments2Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Compose_Nogeneratedattachments2Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return __id.compose_nogeneratedattachments2(inputs)
	return __en.compose_nogeneratedattachments2(inputs)
});
export { compose_nogeneratedattachments2 as "compose.noGeneratedAttachments" }
/**
* | output |
* | --- |
* | "Preparing the send…" |
*
* @param {Compose_Preparingsend1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const compose_preparingsend1 = /** @type {((inputs?: Compose_Preparingsend1Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Compose_Preparingsend1Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return __id.compose_preparingsend1(inputs)
	return __en.compose_preparingsend1(inputs)
});
export { compose_preparingsend1 as "compose.preparingSend" }
/**
* | output |
* | --- |
* | "Sending…" |
*
* @param {Compose_SendingInputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const compose_sending = /** @type {((inputs?: Compose_SendingInputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Compose_SendingInputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return __id.compose_sending(inputs)
	return __en.compose_sending(inputs)
});
export { compose_sending as "compose.sending" }
/**
* | output |
* | --- |
* | "{sent} sent · {failed} failed · {pending} pending" |
*
* @param {Compose_Sendcounts1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const compose_sendcounts1 = /** @type {((inputs: Compose_Sendcounts1Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Compose_Sendcounts1Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return __id.compose_sendcounts1(inputs)
	return __en.compose_sendcounts1(inputs)
});
export { compose_sendcounts1 as "compose.sendCounts" }
/**
* | output |
* | --- |
* | "The in-flight email is finishing - resume in a moment" |
*
* @param {Compose_Windingdowntitle2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const compose_windingdowntitle2 = /** @type {((inputs?: Compose_Windingdowntitle2Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Compose_Windingdowntitle2Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return __id.compose_windingdowntitle2(inputs)
	return __en.compose_windingdowntitle2(inputs)
});
export { compose_windingdowntitle2 as "compose.windingDownTitle" }
/**
* | output |
* | --- |
* | "{current} of {total} sent - cancel anyway?" |
*
* @param {Compose_Cancelsendconfirm2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const compose_cancelsendconfirm2 = /** @type {((inputs: Compose_Cancelsendconfirm2Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Compose_Cancelsendconfirm2Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return __id.compose_cancelsendconfirm2(inputs)
	return __en.compose_cancelsendconfirm2(inputs)
});
export { compose_cancelsendconfirm2 as "compose.cancelSendConfirm" }
/**
* | output |
* | --- |
* | "Per-recipient log" |
*
* @param {Compose_Perrecipientlog2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const compose_perrecipientlog2 = /** @type {((inputs?: Compose_Perrecipientlog2Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Compose_Perrecipientlog2Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return __id.compose_perrecipientlog2(inputs)
	return __en.compose_perrecipientlog2(inputs)
});
export { compose_perrecipientlog2 as "compose.perRecipientLog" }
/**
* | output |
* | --- |
* | "Waiting for the first email…" |
*
* @param {Compose_Waitingfirstemail2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const compose_waitingfirstemail2 = /** @type {((inputs?: Compose_Waitingfirstemail2Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Compose_Waitingfirstemail2Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return __id.compose_waitingfirstemail2(inputs)
	return __en.compose_waitingfirstemail2(inputs)
});
export { compose_waitingfirstemail2 as "compose.waitingFirstEmail" }
/**
* | output |
* | --- |
* | "All {count} emails sent." |
*
* @param {Compose_Allemailssent2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const compose_allemailssent2 = /** @type {((inputs: Compose_Allemailssent2Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Compose_Allemailssent2Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return __id.compose_allemailssent2(inputs)
	return __en.compose_allemailssent2(inputs)
});
export { compose_allemailssent2 as "compose.allEmailsSent" }
/**
* | output |
* | --- |
* | "{sent} sent, {failed} failed. Retry the failures below." |
*
* @param {Compose_Sentwithfailures2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const compose_sentwithfailures2 = /** @type {((inputs: Compose_Sentwithfailures2Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Compose_Sentwithfailures2Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return __id.compose_sentwithfailures2(inputs)
	return __en.compose_sentwithfailures2(inputs)
});
export { compose_sentwithfailures2 as "compose.sentWithFailures" }
/**
* | output |
* | --- |
* | "Send cancelled." |
*
* @param {Compose_Sendcancelled1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const compose_sendcancelled1 = /** @type {((inputs?: Compose_Sendcancelled1Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Compose_Sendcancelled1Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return __id.compose_sendcancelled1(inputs)
	return __en.compose_sendcancelled1(inputs)
});
export { compose_sendcancelled1 as "compose.sendCancelled" }
/**
* | output |
* | --- |
* | "{sent} sent, {skipped} skipped. No one was double-sent. To send to the skipped recipients, go back and start a new send from the same generated PDFs." |
*
* @param {Compose_Cancelleddetail1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const compose_cancelleddetail1 = /** @type {((inputs: Compose_Cancelleddetail1Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Compose_Cancelleddetail1Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return __id.compose_cancelleddetail1(inputs)
	return __en.compose_cancelleddetail1(inputs)
});
export { compose_cancelleddetail1 as "compose.cancelledDetail" }
/**
* | output |
* | --- |
* | "Recipient" |
*
* @param {Compose_RecipientInputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const compose_recipient = /** @type {((inputs?: Compose_RecipientInputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Compose_RecipientInputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return __id.compose_recipient(inputs)
	return __en.compose_recipient(inputs)
});
export { compose_recipient as "compose.recipient" }
/**
* | output |
* | --- |
* | "- skipped" |
*
* @param {Compose_Rowskipped1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const compose_rowskipped1 = /** @type {((inputs?: Compose_Rowskipped1Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Compose_Rowskipped1Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return __id.compose_rowskipped1(inputs)
	return __en.compose_rowskipped1(inputs)
});
export { compose_rowskipped1 as "compose.rowSkipped" }
/**
* | output |
* | --- |
* | "Sending failed." |
*
* @param {Compose_Sendingfailed1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const compose_sendingfailed1 = /** @type {((inputs?: Compose_Sendingfailed1Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Compose_Sendingfailed1Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return __id.compose_sendingfailed1(inputs)
	return __en.compose_sendingfailed1(inputs)
});
export { compose_sendingfailed1 as "compose.sendingFailed" }
/**
* | output |
* | --- |
* | "Could not start the send." |
*
* @param {Compose_Couldnotstartsend3Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const compose_couldnotstartsend3 = /** @type {((inputs?: Compose_Couldnotstartsend3Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Compose_Couldnotstartsend3Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return __id.compose_couldnotstartsend3(inputs)
	return __en.compose_couldnotstartsend3(inputs)
});
export { compose_couldnotstartsend3 as "compose.couldNotStartSend" }
/**
* | output |
* | --- |
* | "Could not pause the send." |
*
* @param {Compose_Couldnotpausesend3Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const compose_couldnotpausesend3 = /** @type {((inputs?: Compose_Couldnotpausesend3Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Compose_Couldnotpausesend3Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return __id.compose_couldnotpausesend3(inputs)
	return __en.compose_couldnotpausesend3(inputs)
});
export { compose_couldnotpausesend3 as "compose.couldNotPauseSend" }
/**
* | output |
* | --- |
* | "Could not cancel the send." |
*
* @param {Compose_Couldnotcancelsend3Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const compose_couldnotcancelsend3 = /** @type {((inputs?: Compose_Couldnotcancelsend3Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Compose_Couldnotcancelsend3Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return __id.compose_couldnotcancelsend3(inputs)
	return __en.compose_couldnotcancelsend3(inputs)
});
export { compose_couldnotcancelsend3 as "compose.couldNotCancelSend" }
/**
* | output |
* | --- |
* | "Could not retry the failures." |
*
* @param {Compose_Couldnotretryfailures3Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const compose_couldnotretryfailures3 = /** @type {((inputs?: Compose_Couldnotretryfailures3Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Compose_Couldnotretryfailures3Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return __id.compose_couldnotretryfailures3(inputs)
	return __en.compose_couldnotretryfailures3(inputs)
});
export { compose_couldnotretryfailures3 as "compose.couldNotRetryFailures" }
/**
* | output |
* | --- |
* | "The send job no longer exists." |
*
* @param {Compose_Sendjobnolongerexists4Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const compose_sendjobnolongerexists4 = /** @type {((inputs?: Compose_Sendjobnolongerexists4Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Compose_Sendjobnolongerexists4Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return __id.compose_sendjobnolongerexists4(inputs)
	return __en.compose_sendjobnolongerexists4(inputs)
});
export { compose_sendjobnolongerexists4 as "compose.sendJobNoLongerExists" }
/**
* | output |
* | --- |
* | "Could not resume the send." |
*
* @param {Compose_Couldnotresumesend3Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const compose_couldnotresumesend3 = /** @type {((inputs?: Compose_Couldnotresumesend3Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Compose_Couldnotresumesend3Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return __id.compose_couldnotresumesend3(inputs)
	return __en.compose_couldnotresumesend3(inputs)
});
export { compose_couldnotresumesend3 as "compose.couldNotResumeSend" }
/**
* | output |
* | --- |
* | "{count} recipient selected" |
*
* @param {Compose_Recipientsselectedone2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const compose_recipientsselectedone2 = /** @type {((inputs: Compose_Recipientsselectedone2Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Compose_Recipientsselectedone2Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return __id.compose_recipientsselectedone2(inputs)
	return __en.compose_recipientsselectedone2(inputs)
});
export { compose_recipientsselectedone2 as "compose.recipientsSelectedOne" }
/**
* | output |
* | --- |
* | "{count} recipients selected" |
*
* @param {Compose_Recipientsselectedother2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const compose_recipientsselectedother2 = /** @type {((inputs: Compose_Recipientsselectedother2Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Compose_Recipientsselectedother2Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return __id.compose_recipientsselectedother2(inputs)
	return __en.compose_recipientsselectedother2(inputs)
});
export { compose_recipientsselectedother2 as "compose.recipientsSelectedOther" }
/**
* | output |
* | --- |
* | "Retry pre-filled from Logs: {count} failed recipient, the same template, message, and SMTP." |
*
* @param {Compose_Prefillretryone2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const compose_prefillretryone2 = /** @type {((inputs: Compose_Prefillretryone2Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Compose_Prefillretryone2Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return __id.compose_prefillretryone2(inputs)
	return __en.compose_prefillretryone2(inputs)
});
export { compose_prefillretryone2 as "compose.prefillRetryOne" }
/**
* | output |
* | --- |
* | "Retry pre-filled from Logs: {count} failed recipients, the same template, message, and SMTP." |
*
* @param {Compose_Prefillretryother2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const compose_prefillretryother2 = /** @type {((inputs: Compose_Prefillretryother2Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Compose_Prefillretryother2Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return __id.compose_prefillretryother2(inputs)
	return __en.compose_prefillretryother2(inputs)
});
export { compose_prefillretryother2 as "compose.prefillRetryOther" }
/**
* | output |
* | --- |
* | "{count} previously failed recipient was deleted." |
*
* @param {Compose_Prefilldeletedone2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const compose_prefilldeletedone2 = /** @type {((inputs: Compose_Prefilldeletedone2Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Compose_Prefilldeletedone2Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return __id.compose_prefilldeletedone2(inputs)
	return __en.compose_prefilldeletedone2(inputs)
});
export { compose_prefilldeletedone2 as "compose.prefillDeletedOne" }
/**
* | output |
* | --- |
* | "{count} previously failed recipients were deleted." |
*
* @param {Compose_Prefilldeletedother2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const compose_prefilldeletedother2 = /** @type {((inputs: Compose_Prefilldeletedother2Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Compose_Prefilldeletedother2Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return __id.compose_prefilldeletedother2(inputs)
	return __en.compose_prefilldeletedother2(inputs)
});
export { compose_prefilldeletedother2 as "compose.prefillDeletedOther" }
/**
* | output |
* | --- |
* | "{slot} - {count} recipient" |
*
* @param {Compose_Slotmissingcountone3Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const compose_slotmissingcountone3 = /** @type {((inputs: Compose_Slotmissingcountone3Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Compose_Slotmissingcountone3Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return __id.compose_slotmissingcountone3(inputs)
	return __en.compose_slotmissingcountone3(inputs)
});
export { compose_slotmissingcountone3 as "compose.slotMissingCountOne" }
/**
* | output |
* | --- |
* | "{slot} - {count} recipients" |
*
* @param {Compose_Slotmissingcountother3Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const compose_slotmissingcountother3 = /** @type {((inputs: Compose_Slotmissingcountother3Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Compose_Slotmissingcountother3Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return __id.compose_slotmissingcountother3(inputs)
	return __en.compose_slotmissingcountother3(inputs)
});
export { compose_slotmissingcountother3 as "compose.slotMissingCountOther" }
/**
* | output |
* | --- |
* | "Unknown slot: {list}" |
*
* @param {Compose_Unknownslottitleone3Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const compose_unknownslottitleone3 = /** @type {((inputs: Compose_Unknownslottitleone3Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Compose_Unknownslottitleone3Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return __id.compose_unknownslottitleone3(inputs)
	return __en.compose_unknownslottitleone3(inputs)
});
export { compose_unknownslottitleone3 as "compose.unknownSlotTitleOne" }
/**
* | output |
* | --- |
* | "Unknown slots: {list}" |
*
* @param {Compose_Unknownslottitleother3Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const compose_unknownslottitleother3 = /** @type {((inputs: Compose_Unknownslottitleother3Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Compose_Unknownslottitleother3Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return __id.compose_unknownslottitleother3(inputs)
	return __en.compose_unknownslottitleother3(inputs)
});
export { compose_unknownslottitleother3 as "compose.unknownSlotTitleOther" }
/**
* | output |
* | --- |
* | "Rendered for the first {count} selected recipient - the message updates as you type." |
*
* @param {Compose_Livepreviewhintone3Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const compose_livepreviewhintone3 = /** @type {((inputs: Compose_Livepreviewhintone3Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Compose_Livepreviewhintone3Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return __id.compose_livepreviewhintone3(inputs)
	return __en.compose_livepreviewhintone3(inputs)
});
export { compose_livepreviewhintone3 as "compose.livePreviewHintOne" }
/**
* | output |
* | --- |
* | "Rendered for the first {count} selected recipients - the message updates as you type." |
*
* @param {Compose_Livepreviewhintother3Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const compose_livepreviewhintother3 = /** @type {((inputs: Compose_Livepreviewhintother3Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Compose_Livepreviewhintother3Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return __id.compose_livepreviewhintother3(inputs)
	return __en.compose_livepreviewhintother3(inputs)
});
export { compose_livepreviewhintother3 as "compose.livePreviewHintOther" }
/**
* | output |
* | --- |
* | "Send {count} email" |
*
* @param {Compose_Sendcountone2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const compose_sendcountone2 = /** @type {((inputs: Compose_Sendcountone2Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Compose_Sendcountone2Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return __id.compose_sendcountone2(inputs)
	return __en.compose_sendcountone2(inputs)
});
export { compose_sendcountone2 as "compose.sendCountOne" }
/**
* | output |
* | --- |
* | "Send {count} emails" |
*
* @param {Compose_Sendcountother2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const compose_sendcountother2 = /** @type {((inputs: Compose_Sendcountother2Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Compose_Sendcountother2Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return __id.compose_sendcountother2(inputs)
	return __en.compose_sendcountother2(inputs)
});
export { compose_sendcountother2 as "compose.sendCountOther" }
/**
* | output |
* | --- |
* | "16-character app password" |
*
* @param {Compose_Apppasswordplaceholder2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const compose_apppasswordplaceholder2 = /** @type {((inputs?: Compose_Apppasswordplaceholder2Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Compose_Apppasswordplaceholder2Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return __id.compose_apppasswordplaceholder2(inputs)
	return __en.compose_apppasswordplaceholder2(inputs)
});
export { compose_apppasswordplaceholder2 as "compose.appPasswordPlaceholder" }
/**
* | output |
* | --- |
* | "Templates" |
*
* @param {Templates_TitleInputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const templates_title = /** @type {((inputs?: Templates_TitleInputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Templates_TitleInputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return __id.templates_title(inputs)
	return __en.templates_title(inputs)
});
export { templates_title as "templates.title" }
/**
* | output |
* | --- |
* | "Add template" |
*
* @param {Templates_Addtemplate1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const templates_addtemplate1 = /** @type {((inputs?: Templates_Addtemplate1Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Templates_Addtemplate1Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return __id.templates_addtemplate1(inputs)
	return __en.templates_addtemplate1(inputs)
});
export { templates_addtemplate1 as "templates.addTemplate" }
/**
* | output |
* | --- |
* | "Template \"{name}\" registered." |
*
* @param {Templates_Templateregistered1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const templates_templateregistered1 = /** @type {((inputs: Templates_Templateregistered1Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Templates_Templateregistered1Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return __id.templates_templateregistered1(inputs)
	return __en.templates_templateregistered1(inputs)
});
export { templates_templateregistered1 as "templates.templateRegistered" }
/**
* | output |
* | --- |
* | "Template \"{name}\" saved." |
*
* @param {Templates_Templatesaved1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const templates_templatesaved1 = /** @type {((inputs: Templates_Templatesaved1Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Templates_Templatesaved1Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return __id.templates_templatesaved1(inputs)
	return __en.templates_templatesaved1(inputs)
});
export { templates_templatesaved1 as "templates.templateSaved" }
/**
* | output |
* | --- |
* | "Template deleted." |
*
* @param {Templates_Templatedeleted1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const templates_templatedeleted1 = /** @type {((inputs?: Templates_Templatedeleted1Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Templates_Templatedeleted1Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return __id.templates_templatedeleted1(inputs)
	return __en.templates_templatedeleted1(inputs)
});
export { templates_templatedeleted1 as "templates.templateDeleted" }
/**
* | output |
* | --- |
* | "Could not register the template." |
*
* @param {Templates_Couldnotregister2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const templates_couldnotregister2 = /** @type {((inputs?: Templates_Couldnotregister2Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Templates_Couldnotregister2Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return __id.templates_couldnotregister2(inputs)
	return __en.templates_couldnotregister2(inputs)
});
export { templates_couldnotregister2 as "templates.couldNotRegister" }
/**
* | output |
* | --- |
* | "Could not save the template." |
*
* @param {Templates_Couldnotsave2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const templates_couldnotsave2 = /** @type {((inputs?: Templates_Couldnotsave2Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Templates_Couldnotsave2Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return __id.templates_couldnotsave2(inputs)
	return __en.templates_couldnotsave2(inputs)
});
export { templates_couldnotsave2 as "templates.couldNotSave" }
/**
* | output |
* | --- |
* | "Could not delete the template." |
*
* @param {Templates_Couldnotdelete2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const templates_couldnotdelete2 = /** @type {((inputs?: Templates_Couldnotdelete2Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Templates_Couldnotdelete2Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return __id.templates_couldnotdelete2(inputs)
	return __en.templates_couldnotdelete2(inputs)
});
export { templates_couldnotdelete2 as "templates.couldNotDelete" }
/**
* | output |
* | --- |
* | "Could not load templates." |
*
* @param {Templates_Couldnotload2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const templates_couldnotload2 = /** @type {((inputs?: Templates_Couldnotload2Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Templates_Couldnotload2Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return __id.templates_couldnotload2(inputs)
	return __en.templates_couldnotload2(inputs)
});
export { templates_couldnotload2 as "templates.couldNotLoad" }
/**
* | output |
* | --- |
* | "Loading templates…" |
*
* @param {Templates_Loadingtemplates1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const templates_loadingtemplates1 = /** @type {((inputs?: Templates_Loadingtemplates1Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Templates_Loadingtemplates1Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return __id.templates_loadingtemplates1(inputs)
	return __en.templates_loadingtemplates1(inputs)
});
export { templates_loadingtemplates1 as "templates.loadingTemplates" }
/**
* | output |
* | --- |
* | "No templates yet" |
*
* @param {Templates_Notemplatesyet2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const templates_notemplatesyet2 = /** @type {((inputs?: Templates_Notemplatesyet2Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Templates_Notemplatesyet2Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return __id.templates_notemplatesyet2(inputs)
	return __en.templates_notemplatesyet2(inputs)
});
export { templates_notemplatesyet2 as "templates.noTemplatesYet" }
/**
* | output |
* | --- |
* | "Register a DOCX letter template or an image certificate template to generate personalized documents." |
*
* @param {Templates_Notemplateshint2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const templates_notemplateshint2 = /** @type {((inputs?: Templates_Notemplateshint2Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Templates_Notemplateshint2Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return __id.templates_notemplateshint2(inputs)
	return __en.templates_notemplateshint2(inputs)
});
export { templates_notemplateshint2 as "templates.noTemplatesHint" }
/**
* | output |
* | --- |
* | "\"{fileName}\" is not a supported template. Choose a .docx letter or a .png/.jpg/.jpeg certificate image." |
*
* @param {Templates_Unsupportedfile1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const templates_unsupportedfile1 = /** @type {((inputs: Templates_Unsupportedfile1Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Templates_Unsupportedfile1Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return __id.templates_unsupportedfile1(inputs)
	return __en.templates_unsupportedfile1(inputs)
});
export { templates_unsupportedfile1 as "templates.unsupportedFile" }
/**
* | output |
* | --- |
* | "Registered" |
*
* @param {Templates_RegisteredInputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const templates_registered = /** @type {((inputs?: Templates_RegisteredInputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Templates_RegisteredInputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return __id.templates_registered(inputs)
	return __en.templates_registered(inputs)
});
export { templates_registered as "templates.registered" }
/**
* | output |
* | --- |
* | "Slots" |
*
* @param {Templates_SlotsInputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const templates_slots = /** @type {((inputs?: Templates_SlotsInputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Templates_SlotsInputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return __id.templates_slots(inputs)
	return __en.templates_slots(inputs)
});
export { templates_slots as "templates.slots" }
/**
* | output |
* | --- |
* | "No slots declared." |
*
* @param {Templates_Noslotsdeclared2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const templates_noslotsdeclared2 = /** @type {((inputs?: Templates_Noslotsdeclared2Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Templates_Noslotsdeclared2Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return __id.templates_noslotsdeclared2(inputs)
	return __en.templates_noslotsdeclared2(inputs)
});
export { templates_noslotsdeclared2 as "templates.noSlotsDeclared" }
/**
* | output |
* | --- |
* | "Generated files are named with this pattern, one per recipient." |
*
* @param {Templates_Outputpatternhint2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const templates_outputpatternhint2 = /** @type {((inputs?: Templates_Outputpatternhint2Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Templates_Outputpatternhint2Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return __id.templates_outputpatternhint2(inputs)
	return __en.templates_outputpatternhint2(inputs)
});
export { templates_outputpatternhint2 as "templates.outputPatternHint" }
/**
* | output |
* | --- |
* | "Edit the template file itself in Word (DOCX) or Figma/Photoshop (images) - Email Blast fills it exactly as saved." |
*
* @param {Templates_Editexternallyhint2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const templates_editexternallyhint2 = /** @type {((inputs?: Templates_Editexternallyhint2Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Templates_Editexternallyhint2Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return __id.templates_editexternallyhint2(inputs)
	return __en.templates_editexternallyhint2(inputs)
});
export { templates_editexternallyhint2 as "templates.editExternallyHint" }
/**
* | output |
* | --- |
* | "Edit" |
*
* @param {Templates_EditInputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const templates_edit = /** @type {((inputs?: Templates_EditInputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Templates_EditInputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return __id.templates_edit(inputs)
	return __en.templates_edit(inputs)
});
export { templates_edit as "templates.edit" }
/**
* | output |
* | --- |
* | "Add template" |
*
* @param {Templates_Addtitle1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const templates_addtitle1 = /** @type {((inputs?: Templates_Addtitle1Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Templates_Addtitle1Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return __id.templates_addtitle1(inputs)
	return __en.templates_addtitle1(inputs)
});
export { templates_addtitle1 as "templates.addTitle" }
/**
* | output |
* | --- |
* | "Edit \"{name}\"" |
*
* @param {Templates_Edittitle1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const templates_edittitle1 = /** @type {((inputs: Templates_Edittitle1Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Templates_Edittitle1Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return __id.templates_edittitle1(inputs)
	return __en.templates_edittitle1(inputs)
});
export { templates_edittitle1 as "templates.editTitle" }
/**
* | output |
* | --- |
* | "Template name" |
*
* @param {Templates_Templatename1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const templates_templatename1 = /** @type {((inputs?: Templates_Templatename1Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Templates_Templatename1Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return __id.templates_templatename1(inputs)
	return __en.templates_templatename1(inputs)
});
export { templates_templatename1 as "templates.templateName" }
/**
* | output |
* | --- |
* | "Scanning…" |
*
* @param {Templates_ScanningInputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const templates_scanning = /** @type {((inputs?: Templates_ScanningInputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Templates_ScanningInputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return __id.templates_scanning(inputs)
	return __en.templates_scanning(inputs)
});
export { templates_scanning as "templates.scanning" }
/**
* | output |
* | --- |
* | "Rescan from file" |
*
* @param {Templates_Rescanfromfile2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const templates_rescanfromfile2 = /** @type {((inputs?: Templates_Rescanfromfile2Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Templates_Rescanfromfile2Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return __id.templates_rescanfromfile2(inputs)
	return __en.templates_rescanfromfile2(inputs)
});
export { templates_rescanfromfile2 as "templates.rescanFromFile" }
/**
* | output |
* | --- |
* | "Replace the slots below with the file's placeholders?" |
*
* @param {Templates_Rescanconfirm1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const templates_rescanconfirm1 = /** @type {((inputs?: Templates_Rescanconfirm1Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Templates_Rescanconfirm1Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return __id.templates_rescanconfirm1(inputs)
	return __en.templates_rescanconfirm1(inputs)
});
export { templates_rescanconfirm1 as "templates.rescanConfirm" }
/**
* | output |
* | --- |
* | "Replace slots" |
*
* @param {Templates_Replaceslots1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const templates_replaceslots1 = /** @type {((inputs?: Templates_Replaceslots1Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Templates_Replaceslots1Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return __id.templates_replaceslots1(inputs)
	return __en.templates_replaceslots1(inputs)
});
export { templates_replaceslots1 as "templates.replaceSlots" }
/**
* | output |
* | --- |
* | "Keep my slots" |
*
* @param {Templates_Keepmyslots2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const templates_keepmyslots2 = /** @type {((inputs?: Templates_Keepmyslots2Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Templates_Keepmyslots2Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return __id.templates_keepmyslots2(inputs)
	return __en.templates_keepmyslots2(inputs)
});
export { templates_keepmyslots2 as "templates.keepMySlots" }
/**
* | output |
* | --- |
* | "Detected from the {placeholders} in the document. Add, rename, or remove slots freely." |
*
* @param {Templates_Docxslotshint2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const templates_docxslotshint2 = /** @type {((inputs: Templates_Docxslotshint2Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Templates_Docxslotshint2Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return __id.templates_docxslotshint2(inputs)
	return __en.templates_docxslotshint2(inputs)
});
export { templates_docxslotshint2 as "templates.docxSlotsHint" }
/**
* | output |
* | --- |
* | "Enter the slot names the certificate needs, e.g. nama, instansi." |
*
* @param {Templates_Imageslotshint2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const templates_imageslotshint2 = /** @type {((inputs?: Templates_Imageslotshint2Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Templates_Imageslotshint2Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return __id.templates_imageslotshint2(inputs)
	return __en.templates_imageslotshint2(inputs)
});
export { templates_imageslotshint2 as "templates.imageSlotsHint" }
/**
* | output |
* | --- |
* | "Could not scan the template for slots." |
*
* @param {Templates_Couldnotscan2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const templates_couldnotscan2 = /** @type {((inputs?: Templates_Couldnotscan2Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Templates_Couldnotscan2Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return __id.templates_couldnotscan2(inputs)
	return __en.templates_couldnotscan2(inputs)
});
export { templates_couldnotscan2 as "templates.couldNotScan" }
/**
* | output |
* | --- |
* | "Slots can be typed below instead." |
*
* @param {Templates_Slotscanbetyped3Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const templates_slotscanbetyped3 = /** @type {((inputs?: Templates_Slotscanbetyped3Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Templates_Slotscanbetyped3Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return __id.templates_slotscanbetyped3(inputs)
	return __en.templates_slotscanbetyped3(inputs)
});
export { templates_slotscanbetyped3 as "templates.slotsCanBeTyped" }
/**
* | output |
* | --- |
* | "Slot {index}" |
*
* @param {Templates_Slotaria1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const templates_slotaria1 = /** @type {((inputs: Templates_Slotaria1Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Templates_Slotaria1Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return __id.templates_slotaria1(inputs)
	return __en.templates_slotaria1(inputs)
});
export { templates_slotaria1 as "templates.slotAria" }
/**
* | output |
* | --- |
* | "Remove slot {index}" |
*
* @param {Templates_Removeslotaria2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const templates_removeslotaria2 = /** @type {((inputs: Templates_Removeslotaria2Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Templates_Removeslotaria2Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return __id.templates_removeslotaria2(inputs)
	return __en.templates_removeslotaria2(inputs)
});
export { templates_removeslotaria2 as "templates.removeSlotAria" }
/**
* | output |
* | --- |
* | "Add slot" |
*
* @param {Templates_Addslot1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const templates_addslot1 = /** @type {((inputs?: Templates_Addslot1Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Templates_Addslot1Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return __id.templates_addslot1(inputs)
	return __en.templates_addslot1(inputs)
});
export { templates_addslot1 as "templates.addSlot" }
/**
* | output |
* | --- |
* | "Output pattern" |
*
* @param {Templates_Outputpatternfield2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const templates_outputpatternfield2 = /** @type {((inputs?: Templates_Outputpatternfield2Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Templates_Outputpatternfield2Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return __id.templates_outputpatternfield2(inputs)
	return __en.templates_outputpatternfield2(inputs)
});
export { templates_outputpatternfield2 as "templates.outputPatternField" }
/**
* | output |
* | --- |
* | "e.g. LOA_{no}_{name}.pdf" |
*
* @param {Templates_Outputpatternplaceholder2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const templates_outputpatternplaceholder2 = /** @type {((inputs: Templates_Outputpatternplaceholder2Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Templates_Outputpatternplaceholder2Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return __id.templates_outputpatternplaceholder2(inputs)
	return __en.templates_outputpatternplaceholder2(inputs)
});
export { templates_outputpatternplaceholder2 as "templates.outputPatternPlaceholder" }
/**
* | output |
* | --- |
* | "Register template" |
*
* @param {Templates_Registertemplate1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const templates_registertemplate1 = /** @type {((inputs?: Templates_Registertemplate1Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Templates_Registertemplate1Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return __id.templates_registertemplate1(inputs)
	return __en.templates_registertemplate1(inputs)
});
export { templates_registertemplate1 as "templates.registerTemplate" }
/**
* | output |
* | --- |
* | "Save changes" |
*
* @param {Templates_Savechanges1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const templates_savechanges1 = /** @type {((inputs?: Templates_Savechanges1Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Templates_Savechanges1Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return __id.templates_savechanges1(inputs)
	return __en.templates_savechanges1(inputs)
});
export { templates_savechanges1 as "templates.saveChanges" }
/**
* | output |
* | --- |
* | "Delete \"{name}\"?" |
*
* @param {Templates_Deletetitle1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const templates_deletetitle1 = /** @type {((inputs: Templates_Deletetitle1Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Templates_Deletetitle1Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return __id.templates_deletetitle1(inputs)
	return __en.templates_deletetitle1(inputs)
});
export { templates_deletetitle1 as "templates.deleteTitle" }
/**
* | output |
* | --- |
* | "The template is removed from the app. The file itself stays where it is." |
*
* @param {Templates_Deletedescription1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const templates_deletedescription1 = /** @type {((inputs?: Templates_Deletedescription1Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Templates_Deletedescription1Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return __id.templates_deletedescription1(inputs)
	return __en.templates_deletedescription1(inputs)
});
export { templates_deletedescription1 as "templates.deleteDescription" }
/**
* | output |
* | --- |
* | "this template" |
*
* @param {Templates_Thistemplate1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const templates_thistemplate1 = /** @type {((inputs?: Templates_Thistemplate1Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Templates_Thistemplate1Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return __id.templates_thistemplate1(inputs)
	return __en.templates_thistemplate1(inputs)
});
export { templates_thistemplate1 as "templates.thisTemplate" }
/**
* | output |
* | --- |
* | "{count} template registered" |
*
* @param {Templates_Countregisteredone2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const templates_countregisteredone2 = /** @type {((inputs: Templates_Countregisteredone2Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Templates_Countregisteredone2Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return __id.templates_countregisteredone2(inputs)
	return __en.templates_countregisteredone2(inputs)
});
export { templates_countregisteredone2 as "templates.countRegisteredOne" }
/**
* | output |
* | --- |
* | "{count} templates registered" |
*
* @param {Templates_Countregisteredother2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const templates_countregisteredother2 = /** @type {((inputs: Templates_Countregisteredother2Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Templates_Countregisteredother2Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return __id.templates_countregisteredother2(inputs)
	return __en.templates_countregisteredother2(inputs)
});
export { templates_countregisteredother2 as "templates.countRegisteredOther" }
/**
* | output |
* | --- |
* | "{count} slot · {stamp}" |
*
* @param {Templates_Slotcountone2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const templates_slotcountone2 = /** @type {((inputs: Templates_Slotcountone2Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Templates_Slotcountone2Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return __id.templates_slotcountone2(inputs)
	return __en.templates_slotcountone2(inputs)
});
export { templates_slotcountone2 as "templates.slotCountOne" }
/**
* | output |
* | --- |
* | "{count} slots · {stamp}" |
*
* @param {Templates_Slotcountother2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const templates_slotcountother2 = /** @type {((inputs: Templates_Slotcountother2Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Templates_Slotcountother2Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return __id.templates_slotcountother2(inputs)
	return __en.templates_slotcountother2(inputs)
});
export { templates_slotcountother2 as "templates.slotCountOther" }
/**
* | output |
* | --- |
* | "Import" |
*
* @param {Importpage_Title1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const importpage_title1 = /** @type {((inputs?: Importpage_Title1Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Importpage_Title1Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return __id.importpage_title1(inputs)
	return __en.importpage_title1(inputs)
});
export { importpage_title1 as "importPage.title" }
/**
* | output |
* | --- |
* | "Load recipients from an Excel file, review the preview, and commit them to the database." |
*
* @param {Importpage_Description1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const importpage_description1 = /** @type {((inputs?: Importpage_Description1Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Importpage_Description1Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return __id.importpage_description1(inputs)
	return __en.importpage_description1(inputs)
});
export { importpage_description1 as "importPage.description" }
/**
* | output |
* | --- |
* | "Import another file" |
*
* @param {Importpage_Importanotherfile3Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const importpage_importanotherfile3 = /** @type {((inputs?: Importpage_Importanotherfile3Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Importpage_Importanotherfile3Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return __id.importpage_importanotherfile3(inputs)
	return __en.importpage_importanotherfile3(inputs)
});
export { importpage_importanotherfile3 as "importPage.importAnotherFile" }
/**
* | output |
* | --- |
* | "Drag and drop an Excel file here" |
*
* @param {Importpage_Dragdrophint3Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const importpage_dragdrophint3 = /** @type {((inputs?: Importpage_Dragdrophint3Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Importpage_Dragdrophint3Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return __id.importpage_dragdrophint3(inputs)
	return __en.importpage_dragdrophint3(inputs)
});
export { importpage_dragdrophint3 as "importPage.dragDropHint" }
/**
* | output |
* | --- |
* | ".xlsx or .xls, with the recipient list in the first sheet" |
*
* @param {Importpage_Fileformathint3Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const importpage_fileformathint3 = /** @type {((inputs?: Importpage_Fileformathint3Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Importpage_Fileformathint3Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return __id.importpage_fileformathint3(inputs)
	return __en.importpage_fileformathint3(inputs)
});
export { importpage_fileformathint3 as "importPage.fileFormatHint" }
/**
* | output |
* | --- |
* | "Parsing {fileName}…" |
*
* @param {Importpage_Parsing1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const importpage_parsing1 = /** @type {((inputs: Importpage_Parsing1Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Importpage_Parsing1Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return __id.importpage_parsing1(inputs)
	return __en.importpage_parsing1(inputs)
});
export { importpage_parsing1 as "importPage.parsing" }
/**
* | output |
* | --- |
* | "Import complete" |
*
* @param {Importpage_Importcomplete2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const importpage_importcomplete2 = /** @type {((inputs?: Importpage_Importcomplete2Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Importpage_Importcomplete2Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return __id.importpage_importcomplete2(inputs)
	return __en.importpage_importcomplete2(inputs)
});
export { importpage_importcomplete2 as "importPage.importComplete" }
/**
* | output |
* | --- |
* | "Go to Compose" |
*
* @param {Importpage_Gotocompose3Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const importpage_gotocompose3 = /** @type {((inputs?: Importpage_Gotocompose3Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Importpage_Gotocompose3Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return __id.importpage_gotocompose3(inputs)
	return __en.importpage_gotocompose3(inputs)
});
export { importpage_gotocompose3 as "importPage.goToCompose" }
/**
* | output |
* | --- |
* | "Go to Recipients" |
*
* @param {Importpage_Gotorecipients3Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const importpage_gotorecipients3 = /** @type {((inputs?: Importpage_Gotorecipients3Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Importpage_Gotorecipients3Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return __id.importpage_gotorecipients3(inputs)
	return __en.importpage_gotorecipients3(inputs)
});
export { importpage_gotorecipients3 as "importPage.goToRecipients" }
/**
* | output |
* | --- |
* | "Could not read the file. It may not be a valid Excel file." |
*
* @param {Importpage_Couldnotread3Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const importpage_couldnotread3 = /** @type {((inputs?: Importpage_Couldnotread3Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Importpage_Couldnotread3Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return __id.importpage_couldnotread3(inputs)
	return __en.importpage_couldnotread3(inputs)
});
export { importpage_couldnotread3 as "importPage.couldNotRead" }
/**
* | output |
* | --- |
* | "\"{fileName}\" is not an Excel file. Choose a .xlsx or .xls file." |
*
* @param {Importpage_Notexcelfile3Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const importpage_notexcelfile3 = /** @type {((inputs: Importpage_Notexcelfile3Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Importpage_Notexcelfile3Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return __id.importpage_notexcelfile3(inputs)
	return __en.importpage_notexcelfile3(inputs)
});
export { importpage_notexcelfile3 as "importPage.notExcelFile" }
/**
* | output |
* | --- |
* | "Could not commit the import." |
*
* @param {Importpage_Couldnotcommit3Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const importpage_couldnotcommit3 = /** @type {((inputs?: Importpage_Couldnotcommit3Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Importpage_Couldnotcommit3Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return __id.importpage_couldnotcommit3(inputs)
	return __en.importpage_couldnotcommit3(inputs)
});
export { importpage_couldnotcommit3 as "importPage.couldNotCommit" }
/**
* | output |
* | --- |
* | "Preview" |
*
* @param {Importpage_Preview1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const importpage_preview1 = /** @type {((inputs?: Importpage_Preview1Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Importpage_Preview1Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return __id.importpage_preview1(inputs)
	return __en.importpage_preview1(inputs)
});
export { importpage_preview1 as "importPage.preview" }
/**
* | output |
* | --- |
* | "{fileName} - showing {shown} of {total} rows" |
*
* @param {Importpage_Previewrows2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const importpage_previewrows2 = /** @type {((inputs: Importpage_Previewrows2Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Importpage_Previewrows2Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return __id.importpage_previewrows2(inputs)
	return __en.importpage_previewrows2(inputs)
});
export { importpage_previewrows2 as "importPage.previewRows" }
/**
* | output |
* | --- |
* | "Column mapping" |
*
* @param {Importpage_Columnmapping2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const importpage_columnmapping2 = /** @type {((inputs?: Importpage_Columnmapping2Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Importpage_Columnmapping2Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return __id.importpage_columnmapping2(inputs)
	return __en.importpage_columnmapping2(inputs)
});
export { importpage_columnmapping2 as "importPage.columnMapping" }
/**
* | output |
* | --- |
* | "Match each Excel column to a recipient field. Name, email, and phone can each be used once; other columns become metadata available to template placeholders." |
*
* @param {Importpage_Columnmappinghint3Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const importpage_columnmappinghint3 = /** @type {((inputs?: Importpage_Columnmappinghint3Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Importpage_Columnmappinghint3Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return __id.importpage_columnmappinghint3(inputs)
	return __en.importpage_columnmappinghint3(inputs)
});
export { importpage_columnmappinghint3 as "importPage.columnMappingHint" }
/**
* | output |
* | --- |
* | "Role of the \"{column}\" column" |
*
* @param {Importpage_Columnrolearia3Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const importpage_columnrolearia3 = /** @type {((inputs: Importpage_Columnrolearia3Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Importpage_Columnrolearia3Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return __id.importpage_columnrolearia3(inputs)
	return __en.importpage_columnrolearia3(inputs)
});
export { importpage_columnrolearia3 as "importPage.columnRoleAria" }
/**
* | output |
* | --- |
* | "Reset mapping" |
*
* @param {Importpage_Resetmapping2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const importpage_resetmapping2 = /** @type {((inputs?: Importpage_Resetmapping2Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Importpage_Resetmapping2Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return __id.importpage_resetmapping2(inputs)
	return __en.importpage_resetmapping2(inputs)
});
export { importpage_resetmapping2 as "importPage.resetMapping" }
/**
* | output |
* | --- |
* | "Select a name column to import" |
*
* @param {Importpage_Selectnamecolumn3Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const importpage_selectnamecolumn3 = /** @type {((inputs?: Importpage_Selectnamecolumn3Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Importpage_Selectnamecolumn3Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return __id.importpage_selectnamecolumn3(inputs)
	return __en.importpage_selectnamecolumn3(inputs)
});
export { importpage_selectnamecolumn3 as "importPage.selectNameColumn" }
/**
* | output |
* | --- |
* | "Importing…" |
*
* @param {Importpage_Importing1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const importpage_importing1 = /** @type {((inputs?: Importpage_Importing1Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Importpage_Importing1Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return __id.importpage_importing1(inputs)
	return __en.importpage_importing1(inputs)
});
export { importpage_importing1 as "importPage.importing" }
/**
* | output |
* | --- |
* | "Import recipients" |
*
* @param {Importpage_Importrecipients2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const importpage_importrecipients2 = /** @type {((inputs?: Importpage_Importrecipients2Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Importpage_Importrecipients2Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return __id.importpage_importrecipients2(inputs)
	return __en.importpage_importrecipients2(inputs)
});
export { importpage_importrecipients2 as "importPage.importRecipients" }
/**
* | output |
* | --- |
* | "No data rows found in the first sheet." |
*
* @param {Importpage_Nodatarows3Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const importpage_nodatarows3 = /** @type {((inputs?: Importpage_Nodatarows3Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Importpage_Nodatarows3Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return __id.importpage_nodatarows3(inputs)
	return __en.importpage_nodatarows3(inputs)
});
export { importpage_nodatarows3 as "importPage.noDataRows" }
/**
* | output |
* | --- |
* | "Name" |
*
* @param {Importpage_Rolename2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const importpage_rolename2 = /** @type {((inputs?: Importpage_Rolename2Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Importpage_Rolename2Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return __id.importpage_rolename2(inputs)
	return __en.importpage_rolename2(inputs)
});
export { importpage_rolename2 as "importPage.roleName" }
/**
* | output |
* | --- |
* | "Email" |
*
* @param {Importpage_Roleemail2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const importpage_roleemail2 = /** @type {((inputs?: Importpage_Roleemail2Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Importpage_Roleemail2Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return __id.importpage_roleemail2(inputs)
	return __en.importpage_roleemail2(inputs)
});
export { importpage_roleemail2 as "importPage.roleEmail" }
/**
* | output |
* | --- |
* | "Phone" |
*
* @param {Importpage_Rolephone2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const importpage_rolephone2 = /** @type {((inputs?: Importpage_Rolephone2Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Importpage_Rolephone2Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return __id.importpage_rolephone2(inputs)
	return __en.importpage_rolephone2(inputs)
});
export { importpage_rolephone2 as "importPage.rolePhone" }
/**
* | output |
* | --- |
* | "Metadata" |
*
* @param {Importpage_Rolemetadata2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const importpage_rolemetadata2 = /** @type {((inputs?: Importpage_Rolemetadata2Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Importpage_Rolemetadata2Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return __id.importpage_rolemetadata2(inputs)
	return __en.importpage_rolemetadata2(inputs)
});
export { importpage_rolemetadata2 as "importPage.roleMetadata" }
/**
* | output |
* | --- |
* | "Skip" |
*
* @param {Importpage_Roleskip2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const importpage_roleskip2 = /** @type {((inputs?: Importpage_Roleskip2Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Importpage_Roleskip2Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return __id.importpage_roleskip2(inputs)
	return __en.importpage_roleskip2(inputs)
});
export { importpage_roleskip2 as "importPage.roleSkip" }
/**
* | output |
* | --- |
* | "Imported {imported} recipients from {fileName}. {duplicatesSkipped} duplicate skipped." |
*
* @param {Importpage_Importcompletedetailone4Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const importpage_importcompletedetailone4 = /** @type {((inputs: Importpage_Importcompletedetailone4Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Importpage_Importcompletedetailone4Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return __id.importpage_importcompletedetailone4(inputs)
	return __en.importpage_importcompletedetailone4(inputs)
});
export { importpage_importcompletedetailone4 as "importPage.importCompleteDetailOne" }
/**
* | output |
* | --- |
* | "Imported {imported} recipients from {fileName}. {duplicatesSkipped} duplicates skipped." |
*
* @param {Importpage_Importcompletedetailother4Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const importpage_importcompletedetailother4 = /** @type {((inputs: Importpage_Importcompletedetailother4Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Importpage_Importcompletedetailother4Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return __id.importpage_importcompletedetailother4(inputs)
	return __en.importpage_importcompletedetailother4(inputs)
});
export { importpage_importcompletedetailother4 as "importPage.importCompleteDetailOther" }
/**
* | output |
* | --- |
* | "{count} row skipped: the name column was empty for it." |
*
* @param {Importpage_Rowsskippednonameone5Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const importpage_rowsskippednonameone5 = /** @type {((inputs: Importpage_Rowsskippednonameone5Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Importpage_Rowsskippednonameone5Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return __id.importpage_rowsskippednonameone5(inputs)
	return __en.importpage_rowsskippednonameone5(inputs)
});
export { importpage_rowsskippednonameone5 as "importPage.rowsSkippedNoNameOne" }
/**
* | output |
* | --- |
* | "{count} rows skipped: the name column was empty for them." |
*
* @param {Importpage_Rowsskippednonameother5Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const importpage_rowsskippednonameother5 = /** @type {((inputs: Importpage_Rowsskippednonameother5Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Importpage_Rowsskippednonameother5Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return __id.importpage_rowsskippednonameother5(inputs)
	return __en.importpage_rowsskippednonameother5(inputs)
});
export { importpage_rowsskippednonameother5 as "importPage.rowsSkippedNoNameOther" }
/**
* | output |
* | --- |
* | "Imported {imported} recipients. {duplicatesSkipped} duplicate skipped." |
*
* @param {Importpage_Importedtoastone3Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const importpage_importedtoastone3 = /** @type {((inputs: Importpage_Importedtoastone3Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Importpage_Importedtoastone3Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return __id.importpage_importedtoastone3(inputs)
	return __en.importpage_importedtoastone3(inputs)
});
export { importpage_importedtoastone3 as "importPage.importedToastOne" }
/**
* | output |
* | --- |
* | "Imported {imported} recipients. {duplicatesSkipped} duplicates skipped." |
*
* @param {Importpage_Importedtoastother3Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const importpage_importedtoastother3 = /** @type {((inputs: Importpage_Importedtoastother3Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Importpage_Importedtoastother3Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return __id.importpage_importedtoastother3(inputs)
	return __en.importpage_importedtoastother3(inputs)
});
export { importpage_importedtoastother3 as "importPage.importedToastOther" }
/**
* | output |
* | --- |
* | "{count} duplicate already skipped during parsing." |
*
* @param {Importpage_Duplicatesskippedparsingone4Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const importpage_duplicatesskippedparsingone4 = /** @type {((inputs: Importpage_Duplicatesskippedparsingone4Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Importpage_Duplicatesskippedparsingone4Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return __id.importpage_duplicatesskippedparsingone4(inputs)
	return __en.importpage_duplicatesskippedparsingone4(inputs)
});
export { importpage_duplicatesskippedparsingone4 as "importPage.duplicatesSkippedParsingOne" }
/**
* | output |
* | --- |
* | "{count} duplicates already skipped during parsing." |
*
* @param {Importpage_Duplicatesskippedparsingother4Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const importpage_duplicatesskippedparsingother4 = /** @type {((inputs: Importpage_Duplicatesskippedparsingother4Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Importpage_Duplicatesskippedparsingother4Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return __id.importpage_duplicatesskippedparsingother4(inputs)
	return __en.importpage_duplicatesskippedparsingother4(inputs)
});
export { importpage_duplicatesskippedparsingother4 as "importPage.duplicatesSkippedParsingOther" }
/**
* | output |
* | --- |
* | "Recipients" |
*
* @param {Recipients_TitleInputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const recipients_title = /** @type {((inputs?: Recipients_TitleInputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Recipients_TitleInputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return __id.recipients_title(inputs)
	return __en.recipients_title(inputs)
});
export { recipients_title as "recipients.title" }
/**
* | output |
* | --- |
* | "Could not delete the selected recipients." |
*
* @param {Recipients_Couldnotdelete2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const recipients_couldnotdelete2 = /** @type {((inputs?: Recipients_Couldnotdelete2Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Recipients_Couldnotdelete2Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return __id.recipients_couldnotdelete2(inputs)
	return __en.recipients_couldnotdelete2(inputs)
});
export { recipients_couldnotdelete2 as "recipients.couldNotDelete" }
/**
* | output |
* | --- |
* | "Delete selected" |
*
* @param {Recipients_Deleteselected1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const recipients_deleteselected1 = /** @type {((inputs?: Recipients_Deleteselected1Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Recipients_Deleteselected1Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return __id.recipients_deleteselected1(inputs)
	return __en.recipients_deleteselected1(inputs)
});
export { recipients_deleteselected1 as "recipients.deleteSelected" }
/**
* | output |
* | --- |
* | "Delete selected ({count})" |
*
* @param {Recipients_Deleteselectedcount2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const recipients_deleteselectedcount2 = /** @type {((inputs: Recipients_Deleteselectedcount2Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Recipients_Deleteselectedcount2Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return __id.recipients_deleteselectedcount2(inputs)
	return __en.recipients_deleteselectedcount2(inputs)
});
export { recipients_deleteselectedcount2 as "recipients.deleteSelectedCount" }
/**
* | output |
* | --- |
* | "Search name, email, phone, or any field…" |
*
* @param {Recipients_Searchplaceholder1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const recipients_searchplaceholder1 = /** @type {((inputs?: Recipients_Searchplaceholder1Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Recipients_Searchplaceholder1Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return __id.recipients_searchplaceholder1(inputs)
	return __en.recipients_searchplaceholder1(inputs)
});
export { recipients_searchplaceholder1 as "recipients.searchPlaceholder" }
/**
* | output |
* | --- |
* | "Search recipients" |
*
* @param {Recipients_Searcharia1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const recipients_searcharia1 = /** @type {((inputs?: Recipients_Searcharia1Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Recipients_Searcharia1Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return __id.recipients_searcharia1(inputs)
	return __en.recipients_searcharia1(inputs)
});
export { recipients_searcharia1 as "recipients.searchAria" }
/**
* | output |
* | --- |
* | "Filter by import batch" |
*
* @param {Recipients_Filterbybatch2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const recipients_filterbybatch2 = /** @type {((inputs?: Recipients_Filterbybatch2Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Recipients_Filterbybatch2Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return __id.recipients_filterbybatch2(inputs)
	return __en.recipients_filterbybatch2(inputs)
});
export { recipients_filterbybatch2 as "recipients.filterByBatch" }
/**
* | output |
* | --- |
* | "All batches" |
*
* @param {Recipients_Allbatches1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const recipients_allbatches1 = /** @type {((inputs?: Recipients_Allbatches1Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Recipients_Allbatches1Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return __id.recipients_allbatches1(inputs)
	return __en.recipients_allbatches1(inputs)
});
export { recipients_allbatches1 as "recipients.allBatches" }
/**
* | output |
* | --- |
* | "Could not load recipients." |
*
* @param {Recipients_Couldnotload2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const recipients_couldnotload2 = /** @type {((inputs?: Recipients_Couldnotload2Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Recipients_Couldnotload2Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return __id.recipients_couldnotload2(inputs)
	return __en.recipients_couldnotload2(inputs)
});
export { recipients_couldnotload2 as "recipients.couldNotLoad" }
/**
* | output |
* | --- |
* | "Loading recipients…" |
*
* @param {Recipients_Loadingrecipients1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const recipients_loadingrecipients1 = /** @type {((inputs?: Recipients_Loadingrecipients1Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Recipients_Loadingrecipients1Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return __id.recipients_loadingrecipients1(inputs)
	return __en.recipients_loadingrecipients1(inputs)
});
export { recipients_loadingrecipients1 as "recipients.loadingRecipients" }
/**
* | output |
* | --- |
* | "No recipients yet" |
*
* @param {Recipients_Norecipientsyet2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const recipients_norecipientsyet2 = /** @type {((inputs?: Recipients_Norecipientsyet2Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Recipients_Norecipientsyet2Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return __id.recipients_norecipientsyet2(inputs)
	return __en.recipients_norecipientsyet2(inputs)
});
export { recipients_norecipientsyet2 as "recipients.noRecipientsYet" }
/**
* | output |
* | --- |
* | "Import an Excel file to fill the directory." |
*
* @param {Recipients_Norecipientshint2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const recipients_norecipientshint2 = /** @type {((inputs?: Recipients_Norecipientshint2Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Recipients_Norecipientshint2Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return __id.recipients_norecipientshint2(inputs)
	return __en.recipients_norecipientshint2(inputs)
});
export { recipients_norecipientshint2 as "recipients.noRecipientsHint" }
/**
* | output |
* | --- |
* | "Go to Import" |
*
* @param {Recipients_Gotoimport2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const recipients_gotoimport2 = /** @type {((inputs?: Recipients_Gotoimport2Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Recipients_Gotoimport2Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return __id.recipients_gotoimport2(inputs)
	return __en.recipients_gotoimport2(inputs)
});
export { recipients_gotoimport2 as "recipients.goToImport" }
/**
* | output |
* | --- |
* | "No recipients match your filters" |
*
* @param {Recipients_Nomatchfilters2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const recipients_nomatchfilters2 = /** @type {((inputs?: Recipients_Nomatchfilters2Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Recipients_Nomatchfilters2Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return __id.recipients_nomatchfilters2(inputs)
	return __en.recipients_nomatchfilters2(inputs)
});
export { recipients_nomatchfilters2 as "recipients.noMatchFilters" }
/**
* | output |
* | --- |
* | "Try a different search or batch." |
*
* @param {Recipients_Nomatchhint2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const recipients_nomatchhint2 = /** @type {((inputs?: Recipients_Nomatchhint2Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Recipients_Nomatchhint2Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return __id.recipients_nomatchhint2(inputs)
	return __en.recipients_nomatchhint2(inputs)
});
export { recipients_nomatchhint2 as "recipients.noMatchHint" }
/**
* | output |
* | --- |
* | "Clear filters" |
*
* @param {Recipients_Clearfilters1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const recipients_clearfilters1 = /** @type {((inputs?: Recipients_Clearfilters1Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Recipients_Clearfilters1Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return __id.recipients_clearfilters1(inputs)
	return __en.recipients_clearfilters1(inputs)
});
export { recipients_clearfilters1 as "recipients.clearFilters" }
/**
* | output |
* | --- |
* | "Showing {from}-{to} of {total}" |
*
* @param {Recipients_Showingrange1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const recipients_showingrange1 = /** @type {((inputs: Recipients_Showingrange1Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Recipients_Showingrange1Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return __id.recipients_showingrange1(inputs)
	return __en.recipients_showingrange1(inputs)
});
export { recipients_showingrange1 as "recipients.showingRange" }
/**
* | output |
* | --- |
* | "Previous" |
*
* @param {Recipients_PreviousInputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const recipients_previous = /** @type {((inputs?: Recipients_PreviousInputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Recipients_PreviousInputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return __id.recipients_previous(inputs)
	return __en.recipients_previous(inputs)
});
export { recipients_previous as "recipients.previous" }
/**
* | output |
* | --- |
* | "Next" |
*
* @param {Recipients_NextInputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const recipients_next = /** @type {((inputs?: Recipients_NextInputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Recipients_NextInputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return __id.recipients_next(inputs)
	return __en.recipients_next(inputs)
});
export { recipients_next as "recipients.next" }
/**
* | output |
* | --- |
* | "Page {page} of {count}" |
*
* @param {Recipients_Pageof1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const recipients_pageof1 = /** @type {((inputs: Recipients_Pageof1Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Recipients_Pageof1Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return __id.recipients_pageof1(inputs)
	return __en.recipients_pageof1(inputs)
});
export { recipients_pageof1 as "recipients.pageOf" }
/**
* | output |
* | --- |
* | "Select all recipients on this page" |
*
* @param {Recipients_Selectallonpage3Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const recipients_selectallonpage3 = /** @type {((inputs?: Recipients_Selectallonpage3Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Recipients_Selectallonpage3Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return __id.recipients_selectallonpage3(inputs)
	return __en.recipients_selectallonpage3(inputs)
});
export { recipients_selectallonpage3 as "recipients.selectAllOnPage" }
/**
* | output |
* | --- |
* | "Name" |
*
* @param {Recipients_NameInputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const recipients_name = /** @type {((inputs?: Recipients_NameInputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Recipients_NameInputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return __id.recipients_name(inputs)
	return __en.recipients_name(inputs)
});
export { recipients_name as "recipients.name" }
/**
* | output |
* | --- |
* | "Email" |
*
* @param {Recipients_EmailInputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const recipients_email = /** @type {((inputs?: Recipients_EmailInputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Recipients_EmailInputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return __id.recipients_email(inputs)
	return __en.recipients_email(inputs)
});
export { recipients_email as "recipients.email" }
/**
* | output |
* | --- |
* | "Phone" |
*
* @param {Recipients_PhoneInputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const recipients_phone = /** @type {((inputs?: Recipients_PhoneInputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Recipients_PhoneInputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return __id.recipients_phone(inputs)
	return __en.recipients_phone(inputs)
});
export { recipients_phone as "recipients.phone" }
/**
* | output |
* | --- |
* | "Import batch" |
*
* @param {Recipients_Importbatch1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const recipients_importbatch1 = /** @type {((inputs?: Recipients_Importbatch1Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Recipients_Importbatch1Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return __id.recipients_importbatch1(inputs)
	return __en.recipients_importbatch1(inputs)
});
export { recipients_importbatch1 as "recipients.importBatch" }
/**
* | output |
* | --- |
* | "Imported" |
*
* @param {Recipients_ImportedInputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const recipients_imported = /** @type {((inputs?: Recipients_ImportedInputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Recipients_ImportedInputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return __id.recipients_imported(inputs)
	return __en.recipients_imported(inputs)
});
export { recipients_imported as "recipients.imported" }
/**
* | output |
* | --- |
* | "Select {name}" |
*
* @param {Recipients_Selectrecipient1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const recipients_selectrecipient1 = /** @type {((inputs: Recipients_Selectrecipient1Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Recipients_Selectrecipient1Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return __id.recipients_selectrecipient1(inputs)
	return __en.recipients_selectrecipient1(inputs)
});
export { recipients_selectrecipient1 as "recipients.selectRecipient" }
/**
* | output |
* | --- |
* | "No email address" |
*
* @param {Recipients_Noemailaddress2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const recipients_noemailaddress2 = /** @type {((inputs?: Recipients_Noemailaddress2Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Recipients_Noemailaddress2Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return __id.recipients_noemailaddress2(inputs)
	return __en.recipients_noemailaddress2(inputs)
});
export { recipients_noemailaddress2 as "recipients.noEmailAddress" }
/**
* | output |
* | --- |
* | "Custom fields" |
*
* @param {Recipients_Customfields1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const recipients_customfields1 = /** @type {((inputs?: Recipients_Customfields1Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Recipients_Customfields1Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return __id.recipients_customfields1(inputs)
	return __en.recipients_customfields1(inputs)
});
export { recipients_customfields1 as "recipients.customFields" }
/**
* | output |
* | --- |
* | "No custom fields." |
*
* @param {Recipients_Nocustomfields2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const recipients_nocustomfields2 = /** @type {((inputs?: Recipients_Nocustomfields2Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Recipients_Nocustomfields2Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return __id.recipients_nocustomfields2(inputs)
	return __en.recipients_nocustomfields2(inputs)
});
export { recipients_nocustomfields2 as "recipients.noCustomFields" }
/**
* | output |
* | --- |
* | "They will be removed from the directory. Past job history is kept." |
*
* @param {Recipients_Deletedescription1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const recipients_deletedescription1 = /** @type {((inputs?: Recipients_Deletedescription1Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Recipients_Deletedescription1Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return __id.recipients_deletedescription1(inputs)
	return __en.recipients_deletedescription1(inputs)
});
export { recipients_deletedescription1 as "recipients.deleteDescription" }
/**
* | output |
* | --- |
* | "{count} recipient in the directory" |
*
* @param {Recipients_Countindirectoryone3Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const recipients_countindirectoryone3 = /** @type {((inputs: Recipients_Countindirectoryone3Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Recipients_Countindirectoryone3Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return __id.recipients_countindirectoryone3(inputs)
	return __en.recipients_countindirectoryone3(inputs)
});
export { recipients_countindirectoryone3 as "recipients.countInDirectoryOne" }
/**
* | output |
* | --- |
* | "{count} recipients in the directory" |
*
* @param {Recipients_Countindirectoryother3Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const recipients_countindirectoryother3 = /** @type {((inputs: Recipients_Countindirectoryother3Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Recipients_Countindirectoryother3Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return __id.recipients_countindirectoryother3(inputs)
	return __en.recipients_countindirectoryother3(inputs)
});
export { recipients_countindirectoryother3 as "recipients.countInDirectoryOther" }
/**
* | output |
* | --- |
* | "Deleted {count} recipient." |
*
* @param {Recipients_Deletedcountone2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const recipients_deletedcountone2 = /** @type {((inputs: Recipients_Deletedcountone2Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Recipients_Deletedcountone2Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return __id.recipients_deletedcountone2(inputs)
	return __en.recipients_deletedcountone2(inputs)
});
export { recipients_deletedcountone2 as "recipients.deletedCountOne" }
/**
* | output |
* | --- |
* | "Deleted {count} recipients." |
*
* @param {Recipients_Deletedcountother2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const recipients_deletedcountother2 = /** @type {((inputs: Recipients_Deletedcountother2Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Recipients_Deletedcountother2Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return __id.recipients_deletedcountother2(inputs)
	return __en.recipients_deletedcountother2(inputs)
});
export { recipients_deletedcountother2 as "recipients.deletedCountOther" }
/**
* | output |
* | --- |
* | "Delete {count} recipient?" |
*
* @param {Recipients_Deletetitleone2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const recipients_deletetitleone2 = /** @type {((inputs: Recipients_Deletetitleone2Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Recipients_Deletetitleone2Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return __id.recipients_deletetitleone2(inputs)
	return __en.recipients_deletetitleone2(inputs)
});
export { recipients_deletetitleone2 as "recipients.deleteTitleOne" }
/**
* | output |
* | --- |
* | "Delete {count} recipients?" |
*
* @param {Recipients_Deletetitleother2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const recipients_deletetitleother2 = /** @type {((inputs: Recipients_Deletetitleother2Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Recipients_Deletetitleother2Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return __id.recipients_deletetitleother2(inputs)
	return __en.recipients_deletetitleother2(inputs)
});
export { recipients_deletetitleother2 as "recipients.deleteTitleOther" }
/**
* | output |
* | --- |
* | "Logs" |
*
* @param {Logs_TitleInputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const logs_title = /** @type {((inputs?: Logs_TitleInputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Logs_TitleInputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return __id.logs_title(inputs)
	return __en.logs_title(inputs)
});
export { logs_title as "logs.title" }
/**
* | output |
* | --- |
* | "Every send job, most recent first - open one for the per-recipient detail." |
*
* @param {Logs_DescriptionInputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const logs_description = /** @type {((inputs?: Logs_DescriptionInputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Logs_DescriptionInputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return __id.logs_description(inputs)
	return __en.logs_description(inputs)
});
export { logs_description as "logs.description" }
/**
* | output |
* | --- |
* | "Filter by status" |
*
* @param {Logs_Filterbystatus2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const logs_filterbystatus2 = /** @type {((inputs?: Logs_Filterbystatus2Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Logs_Filterbystatus2Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return __id.logs_filterbystatus2(inputs)
	return __en.logs_filterbystatus2(inputs)
});
export { logs_filterbystatus2 as "logs.filterByStatus" }
/**
* | output |
* | --- |
* | "All statuses" |
*
* @param {Logs_Allstatuses1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const logs_allstatuses1 = /** @type {((inputs?: Logs_Allstatuses1Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Logs_Allstatuses1Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return __id.logs_allstatuses1(inputs)
	return __en.logs_allstatuses1(inputs)
});
export { logs_allstatuses1 as "logs.allStatuses" }
/**
* | output |
* | --- |
* | "From" |
*
* @param {Logs_FromInputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const logs_from = /** @type {((inputs?: Logs_FromInputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Logs_FromInputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return __id.logs_from(inputs)
	return __en.logs_from(inputs)
});
export { logs_from as "logs.from" }
/**
* | output |
* | --- |
* | "To" |
*
* @param {Logs_ToInputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const logs_to = /** @type {((inputs?: Logs_ToInputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Logs_ToInputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return __id.logs_to(inputs)
	return __en.logs_to(inputs)
});
export { logs_to as "logs.to" }
/**
* | output |
* | --- |
* | "Jobs created from" |
*
* @param {Logs_Jobscreatedfrom2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const logs_jobscreatedfrom2 = /** @type {((inputs?: Logs_Jobscreatedfrom2Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Logs_Jobscreatedfrom2Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return __id.logs_jobscreatedfrom2(inputs)
	return __en.logs_jobscreatedfrom2(inputs)
});
export { logs_jobscreatedfrom2 as "logs.jobsCreatedFrom" }
/**
* | output |
* | --- |
* | "Jobs created up to" |
*
* @param {Logs_Jobscreatedupto3Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const logs_jobscreatedupto3 = /** @type {((inputs?: Logs_Jobscreatedupto3Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Logs_Jobscreatedupto3Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return __id.logs_jobscreatedupto3(inputs)
	return __en.logs_jobscreatedupto3(inputs)
});
export { logs_jobscreatedupto3 as "logs.jobsCreatedUpTo" }
/**
* | output |
* | --- |
* | "Could not load the logs." |
*
* @param {Logs_Couldnotload2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const logs_couldnotload2 = /** @type {((inputs?: Logs_Couldnotload2Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Logs_Couldnotload2Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return __id.logs_couldnotload2(inputs)
	return __en.logs_couldnotload2(inputs)
});
export { logs_couldnotload2 as "logs.couldNotLoad" }
/**
* | output |
* | --- |
* | "Loading logs…" |
*
* @param {Logs_Loadinglogs1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const logs_loadinglogs1 = /** @type {((inputs?: Logs_Loadinglogs1Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Logs_Loadinglogs1Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return __id.logs_loadinglogs1(inputs)
	return __en.logs_loadinglogs1(inputs)
});
export { logs_loadinglogs1 as "logs.loadingLogs" }
/**
* | output |
* | --- |
* | "No jobs match your filters" |
*
* @param {Logs_Nojobsmatchfilters3Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const logs_nojobsmatchfilters3 = /** @type {((inputs?: Logs_Nojobsmatchfilters3Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Logs_Nojobsmatchfilters3Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return __id.logs_nojobsmatchfilters3(inputs)
	return __en.logs_nojobsmatchfilters3(inputs)
});
export { logs_nojobsmatchfilters3 as "logs.noJobsMatchFilters" }
/**
* | output |
* | --- |
* | "Try a different status or date range." |
*
* @param {Logs_Nojobshint2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const logs_nojobshint2 = /** @type {((inputs?: Logs_Nojobshint2Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Logs_Nojobshint2Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return __id.logs_nojobshint2(inputs)
	return __en.logs_nojobshint2(inputs)
});
export { logs_nojobshint2 as "logs.noJobsHint" }
/**
* | output |
* | --- |
* | "No send jobs yet" |
*
* @param {Logs_Nosendjobsyet3Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const logs_nosendjobsyet3 = /** @type {((inputs?: Logs_Nosendjobsyet3Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Logs_Nosendjobsyet3Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return __id.logs_nosendjobsyet3(inputs)
	return __en.logs_nosendjobsyet3(inputs)
});
export { logs_nosendjobsyet3 as "logs.noSendJobsYet" }
/**
* | output |
* | --- |
* | "Send a campaign from the compose wizard and it will appear here." |
*
* @param {Logs_Nosendjobshint3Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const logs_nosendjobshint3 = /** @type {((inputs?: Logs_Nosendjobshint3Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Logs_Nosendjobshint3Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return __id.logs_nosendjobshint3(inputs)
	return __en.logs_nosendjobshint3(inputs)
});
export { logs_nosendjobshint3 as "logs.noSendJobsHint" }
/**
* | output |
* | --- |
* | "Status" |
*
* @param {Logs_StatusInputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const logs_status = /** @type {((inputs?: Logs_StatusInputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Logs_StatusInputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return __id.logs_status(inputs)
	return __en.logs_status(inputs)
});
export { logs_status as "logs.status" }
/**
* | output |
* | --- |
* | "Subject" |
*
* @param {Logs_SubjectInputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const logs_subject = /** @type {((inputs?: Logs_SubjectInputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Logs_SubjectInputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return __id.logs_subject(inputs)
	return __en.logs_subject(inputs)
});
export { logs_subject as "logs.subject" }
/**
* | output |
* | --- |
* | "Template" |
*
* @param {Logs_TemplateInputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const logs_template = /** @type {((inputs?: Logs_TemplateInputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Logs_TemplateInputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return __id.logs_template(inputs)
	return __en.logs_template(inputs)
});
export { logs_template as "logs.template" }
/**
* | output |
* | --- |
* | "Sent / Failed / Skipped" |
*
* @param {Logs_Sentfailedskipped2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const logs_sentfailedskipped2 = /** @type {((inputs?: Logs_Sentfailedskipped2Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Logs_Sentfailedskipped2Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return __id.logs_sentfailedskipped2(inputs)
	return __en.logs_sentfailedskipped2(inputs)
});
export { logs_sentfailedskipped2 as "logs.sentFailedSkipped" }
/**
* | output |
* | --- |
* | "Started" |
*
* @param {Logs_StartedInputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const logs_started = /** @type {((inputs?: Logs_StartedInputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Logs_StartedInputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return __id.logs_started(inputs)
	return __en.logs_started(inputs)
});
export { logs_started as "logs.started" }
/**
* | output |
* | --- |
* | "Duration" |
*
* @param {Logs_DurationInputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const logs_duration = /** @type {((inputs?: Logs_DurationInputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Logs_DurationInputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return __id.logs_duration(inputs)
	return __en.logs_duration(inputs)
});
export { logs_duration as "logs.duration" }
/**
* | output |
* | --- |
* | "Paused - {sent} of {total} sent" |
*
* @param {Logs_Pausedprogress1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const logs_pausedprogress1 = /** @type {((inputs: Logs_Pausedprogress1Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Logs_Pausedprogress1Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return __id.logs_pausedprogress1(inputs)
	return __en.logs_pausedprogress1(inputs)
});
export { logs_pausedprogress1 as "logs.pausedProgress" }
/**
* | output |
* | --- |
* | "Resuming…" |
*
* @param {Logs_ResumingInputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const logs_resuming = /** @type {((inputs?: Logs_ResumingInputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Logs_ResumingInputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return __id.logs_resuming(inputs)
	return __en.logs_resuming(inputs)
});
export { logs_resuming as "logs.resuming" }
/**
* | output |
* | --- |
* | "All logs" |
*
* @param {Jobdetail_Alllogs2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const jobdetail_alllogs2 = /** @type {((inputs?: Jobdetail_Alllogs2Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Jobdetail_Alllogs2Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return __id.jobdetail_alllogs2(inputs)
	return __en.jobdetail_alllogs2(inputs)
});
export { jobdetail_alllogs2 as "jobDetail.allLogs" }
/**
* | output |
* | --- |
* | "Job detail" |
*
* @param {Jobdetail_Jobdetail2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const jobdetail_jobdetail2 = /** @type {((inputs?: Jobdetail_Jobdetail2Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Jobdetail_Jobdetail2Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return __id.jobdetail_jobdetail2(inputs)
	return __en.jobdetail_jobdetail2(inputs)
});
export { jobdetail_jobdetail2 as "jobDetail.jobDetail" }
/**
* | output |
* | --- |
* | "{sent} sent · {failed} failed · {skipped} skipped" |
*
* @param {Jobdetail_Counts1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const jobdetail_counts1 = /** @type {((inputs: Jobdetail_Counts1Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Jobdetail_Counts1Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return __id.jobdetail_counts1(inputs)
	return __en.jobdetail_counts1(inputs)
});
export { jobdetail_counts1 as "jobDetail.counts" }
/**
* | output |
* | --- |
* | "Resume" |
*
* @param {Jobdetail_Resume1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const jobdetail_resume1 = /** @type {((inputs?: Jobdetail_Resume1Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Jobdetail_Resume1Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return __id.jobdetail_resume1(inputs)
	return __en.jobdetail_resume1(inputs)
});
export { jobdetail_resume1 as "jobDetail.resume" }
/**
* | output |
* | --- |
* | "Retry All Failures ({count})" |
*
* @param {Jobdetail_Retryallfailures3Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const jobdetail_retryallfailures3 = /** @type {((inputs: Jobdetail_Retryallfailures3Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Jobdetail_Retryallfailures3Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return __id.jobdetail_retryallfailures3(inputs)
	return __en.jobdetail_retryallfailures3(inputs)
});
export { jobdetail_retryallfailures3 as "jobDetail.retryAllFailures" }
/**
* | output |
* | --- |
* | "Template" |
*
* @param {Jobdetail_Template1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const jobdetail_template1 = /** @type {((inputs?: Jobdetail_Template1Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Jobdetail_Template1Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return __id.jobdetail_template1(inputs)
	return __en.jobdetail_template1(inputs)
});
export { jobdetail_template1 as "jobDetail.template" }
/**
* | output |
* | --- |
* | "SMTP" |
*
* @param {Jobdetail_Smtp1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const jobdetail_smtp1 = /** @type {((inputs?: Jobdetail_Smtp1Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Jobdetail_Smtp1Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return __id.jobdetail_smtp1(inputs)
	return __en.jobdetail_smtp1(inputs)
});
export { jobdetail_smtp1 as "jobDetail.smtp" }
/**
* | output |
* | --- |
* | "Sender" |
*
* @param {Jobdetail_Sender1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const jobdetail_sender1 = /** @type {((inputs?: Jobdetail_Sender1Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Jobdetail_Sender1Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return __id.jobdetail_sender1(inputs)
	return __en.jobdetail_sender1(inputs)
});
export { jobdetail_sender1 as "jobDetail.sender" }
/**
* | output |
* | --- |
* | "Started / Duration" |
*
* @param {Jobdetail_Startedduration2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const jobdetail_startedduration2 = /** @type {((inputs?: Jobdetail_Startedduration2Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Jobdetail_Startedduration2Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return __id.jobdetail_startedduration2(inputs)
	return __en.jobdetail_startedduration2(inputs)
});
export { jobdetail_startedduration2 as "jobDetail.startedDuration" }
/**
* | output |
* | --- |
* | "(deleted profile)" |
*
* @param {Jobdetail_Deletedprofile2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const jobdetail_deletedprofile2 = /** @type {((inputs?: Jobdetail_Deletedprofile2Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Jobdetail_Deletedprofile2Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return __id.jobdetail_deletedprofile2(inputs)
	return __en.jobdetail_deletedprofile2(inputs)
});
export { jobdetail_deletedprofile2 as "jobDetail.deletedProfile" }
/**
* | output |
* | --- |
* | "(inline)" |
*
* @param {Jobdetail_Inline1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const jobdetail_inline1 = /** @type {((inputs?: Jobdetail_Inline1Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Jobdetail_Inline1Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return __id.jobdetail_inline1(inputs)
	return __en.jobdetail_inline1(inputs)
});
export { jobdetail_inline1 as "jobDetail.inline" }
/**
* | output |
* | --- |
* | "Recipient" |
*
* @param {Jobdetail_Recipient1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const jobdetail_recipient1 = /** @type {((inputs?: Jobdetail_Recipient1Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Jobdetail_Recipient1Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return __id.jobdetail_recipient1(inputs)
	return __en.jobdetail_recipient1(inputs)
});
export { jobdetail_recipient1 as "jobDetail.recipient" }
/**
* | output |
* | --- |
* | "No email address" |
*
* @param {Jobdetail_Noemailaddress3Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const jobdetail_noemailaddress3 = /** @type {((inputs?: Jobdetail_Noemailaddress3Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Jobdetail_Noemailaddress3Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return __id.jobdetail_noemailaddress3(inputs)
	return __en.jobdetail_noemailaddress3(inputs)
});
export { jobdetail_noemailaddress3 as "jobDetail.noEmailAddress" }
/**
* | output |
* | --- |
* | "Error" |
*
* @param {Jobdetail_Error1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const jobdetail_error1 = /** @type {((inputs?: Jobdetail_Error1Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Jobdetail_Error1Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return __id.jobdetail_error1(inputs)
	return __en.jobdetail_error1(inputs)
});
export { jobdetail_error1 as "jobDetail.error" }
/**
* | output |
* | --- |
* | "Sent at" |
*
* @param {Jobdetail_Sentat2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const jobdetail_sentat2 = /** @type {((inputs?: Jobdetail_Sentat2Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Jobdetail_Sentat2Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return __id.jobdetail_sentat2(inputs)
	return __en.jobdetail_sentat2(inputs)
});
export { jobdetail_sentat2 as "jobDetail.sentAt" }
/**
* | output |
* | --- |
* | "Message ID" |
*
* @param {Jobdetail_Messageid2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const jobdetail_messageid2 = /** @type {((inputs?: Jobdetail_Messageid2Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Jobdetail_Messageid2Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return __id.jobdetail_messageid2(inputs)
	return __en.jobdetail_messageid2(inputs)
});
export { jobdetail_messageid2 as "jobDetail.messageId" }
/**
* | output |
* | --- |
* | "Retry" |
*
* @param {Jobdetail_Retry1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const jobdetail_retry1 = /** @type {((inputs?: Jobdetail_Retry1Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Jobdetail_Retry1Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return __id.jobdetail_retry1(inputs)
	return __en.jobdetail_retry1(inputs)
});
export { jobdetail_retry1 as "jobDetail.retry" }
/**
* | output |
* | --- |
* | "Search recipient name or email…" |
*
* @param {Jobdetail_Searchplaceholder2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const jobdetail_searchplaceholder2 = /** @type {((inputs?: Jobdetail_Searchplaceholder2Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Jobdetail_Searchplaceholder2Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return __id.jobdetail_searchplaceholder2(inputs)
	return __en.jobdetail_searchplaceholder2(inputs)
});
export { jobdetail_searchplaceholder2 as "jobDetail.searchPlaceholder" }
/**
* | output |
* | --- |
* | "Search recipients of this job" |
*
* @param {Jobdetail_Searcharia2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const jobdetail_searcharia2 = /** @type {((inputs?: Jobdetail_Searcharia2Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Jobdetail_Searcharia2Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return __id.jobdetail_searcharia2(inputs)
	return __en.jobdetail_searcharia2(inputs)
});
export { jobdetail_searcharia2 as "jobDetail.searchAria" }
/**
* | output |
* | --- |
* | "Filter recipients by status" |
*
* @param {Jobdetail_Filterbystatus3Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const jobdetail_filterbystatus3 = /** @type {((inputs?: Jobdetail_Filterbystatus3Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Jobdetail_Filterbystatus3Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return __id.jobdetail_filterbystatus3(inputs)
	return __en.jobdetail_filterbystatus3(inputs)
});
export { jobdetail_filterbystatus3 as "jobDetail.filterByStatus" }
/**
* | output |
* | --- |
* | "Loading job…" |
*
* @param {Jobdetail_Loadingjob2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const jobdetail_loadingjob2 = /** @type {((inputs?: Jobdetail_Loadingjob2Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Jobdetail_Loadingjob2Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return __id.jobdetail_loadingjob2(inputs)
	return __en.jobdetail_loadingjob2(inputs)
});
export { jobdetail_loadingjob2 as "jobDetail.loadingJob" }
/**
* | output |
* | --- |
* | "Could not load this job." |
*
* @param {Jobdetail_Couldnotload3Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const jobdetail_couldnotload3 = /** @type {((inputs?: Jobdetail_Couldnotload3Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Jobdetail_Couldnotload3Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return __id.jobdetail_couldnotload3(inputs)
	return __en.jobdetail_couldnotload3(inputs)
});
export { jobdetail_couldnotload3 as "jobDetail.couldNotLoad" }
/**
* | output |
* | --- |
* | "Job not found" |
*
* @param {Jobdetail_Jobnotfound3Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const jobdetail_jobnotfound3 = /** @type {((inputs?: Jobdetail_Jobnotfound3Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Jobdetail_Jobnotfound3Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return __id.jobdetail_jobnotfound3(inputs)
	return __en.jobdetail_jobnotfound3(inputs)
});
export { jobdetail_jobnotfound3 as "jobDetail.jobNotFound" }
/**
* | output |
* | --- |
* | "It may have been removed from the database." |
*
* @param {Jobdetail_Jobnotfoundhint4Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const jobdetail_jobnotfoundhint4 = /** @type {((inputs?: Jobdetail_Jobnotfoundhint4Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Jobdetail_Jobnotfoundhint4Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return __id.jobdetail_jobnotfoundhint4(inputs)
	return __en.jobdetail_jobnotfoundhint4(inputs)
});
export { jobdetail_jobnotfoundhint4 as "jobDetail.jobNotFoundHint" }
/**
* | output |
* | --- |
* | "Back to Logs" |
*
* @param {Jobdetail_Backtologs3Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const jobdetail_backtologs3 = /** @type {((inputs?: Jobdetail_Backtologs3Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Jobdetail_Backtologs3Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return __id.jobdetail_backtologs3(inputs)
	return __en.jobdetail_backtologs3(inputs)
});
export { jobdetail_backtologs3 as "jobDetail.backToLogs" }
/**
* | output |
* | --- |
* | "No recipients match your search" |
*
* @param {Jobdetail_Nomatchsearch3Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const jobdetail_nomatchsearch3 = /** @type {((inputs?: Jobdetail_Nomatchsearch3Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Jobdetail_Nomatchsearch3Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return __id.jobdetail_nomatchsearch3(inputs)
	return __en.jobdetail_nomatchsearch3(inputs)
});
export { jobdetail_nomatchsearch3 as "jobDetail.noMatchSearch" }
/**
* | output |
* | --- |
* | "Try a different name, email, or status." |
*
* @param {Jobdetail_Nomatchhint3Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const jobdetail_nomatchhint3 = /** @type {((inputs?: Jobdetail_Nomatchhint3Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Jobdetail_Nomatchhint3Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return __id.jobdetail_nomatchhint3(inputs)
	return __en.jobdetail_nomatchhint3(inputs)
});
export { jobdetail_nomatchhint3 as "jobDetail.noMatchHint" }
/**
* | output |
* | --- |
* | "Status" |
*
* @param {Jobdetail_Status1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const jobdetail_status1 = /** @type {((inputs?: Jobdetail_Status1Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Jobdetail_Status1Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return __id.jobdetail_status1(inputs)
	return __en.jobdetail_status1(inputs)
});
export { jobdetail_status1 as "jobDetail.status" }
/**
* | output |
* | --- |
* | "Select at least one recipient to send to." |
*
* @param {Sendjob_Selectrecipients2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const sendjob_selectrecipients2 = /** @type {((inputs?: Sendjob_Selectrecipients2Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Sendjob_Selectrecipients2Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return __id.sendjob_selectrecipients2(inputs)
	return __en.sendjob_selectrecipients2(inputs)
});
export { sendjob_selectrecipients2 as "sendJob.selectRecipients" }
/**
* | output |
* | --- |
* | "Write a subject." |
*
* @param {Sendjob_Writesubject2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const sendjob_writesubject2 = /** @type {((inputs?: Sendjob_Writesubject2Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Sendjob_Writesubject2Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return __id.sendjob_writesubject2(inputs)
	return __en.sendjob_writesubject2(inputs)
});
export { sendjob_writesubject2 as "sendJob.writeSubject" }
/**
* | output |
* | --- |
* | "Write an email body." |
*
* @param {Sendjob_Writebody2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const sendjob_writebody2 = /** @type {((inputs?: Sendjob_Writebody2Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Sendjob_Writebody2Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return __id.sendjob_writebody2(inputs)
	return __en.sendjob_writebody2(inputs)
});
export { sendjob_writebody2 as "sendJob.writeBody" }
/**
* | output |
* | --- |
* | "Enter the sender name and address." |
*
* @param {Sendjob_Entersender2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const sendjob_entersender2 = /** @type {((inputs?: Sendjob_Entersender2Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Sendjob_Entersender2Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return __id.sendjob_entersender2(inputs)
	return __en.sendjob_entersender2(inputs)
});
export { sendjob_entersender2 as "sendJob.enterSender" }
/**
* | output |
* | --- |
* | "Choose either a saved SMTP profile or enter connection details, not both." |
*
* @param {Sendjob_Chooseoneidentity3Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const sendjob_chooseoneidentity3 = /** @type {((inputs?: Sendjob_Chooseoneidentity3Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Sendjob_Chooseoneidentity3Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return __id.sendjob_chooseoneidentity3(inputs)
	return __en.sendjob_chooseoneidentity3(inputs)
});
export { sendjob_chooseoneidentity3 as "sendJob.chooseOneIdentity" }
/**
* | output |
* | --- |
* | "None of the selected recipients still exist." |
*
* @param {Sendjob_Norecipientsexist3Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const sendjob_norecipientsexist3 = /** @type {((inputs?: Sendjob_Norecipientsexist3Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Sendjob_Norecipientsexist3Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return __id.sendjob_norecipientsexist3(inputs)
	return __en.sendjob_norecipientsexist3(inputs)
});
export { sendjob_norecipientsexist3 as "sendJob.noRecipientsExist" }
/**
* | output |
* | --- |
* | "This job is already sending." |
*
* @param {Sendjob_Alreadysending2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const sendjob_alreadysending2 = /** @type {((inputs?: Sendjob_Alreadysending2Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Sendjob_Alreadysending2Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return __id.sendjob_alreadysending2(inputs)
	return __en.sendjob_alreadysending2(inputs)
});
export { sendjob_alreadysending2 as "sendJob.alreadySending" }
/**
* | output |
* | --- |
* | "Another send is in progress or paused. Pause or finish it first." |
*
* @param {Sendjob_Anothersendactive3Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const sendjob_anothersendactive3 = /** @type {((inputs?: Sendjob_Anothersendactive3Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Sendjob_Anothersendactive3Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return __id.sendjob_anothersendactive3(inputs)
	return __en.sendjob_anothersendactive3(inputs)
});
export { sendjob_anothersendactive3 as "sendJob.anotherSendActive" }
/**
* | output |
* | --- |
* | "This job is still pausing - try again in a moment." |
*
* @param {Sendjob_Stillpausing2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const sendjob_stillpausing2 = /** @type {((inputs?: Sendjob_Stillpausing2Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Sendjob_Stillpausing2Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return __id.sendjob_stillpausing2(inputs)
	return __en.sendjob_stillpausing2(inputs)
});
export { sendjob_stillpausing2 as "sendJob.stillPausing" }
/**
* | output |
* | --- |
* | "Only a sending job can be paused." |
*
* @param {Sendjob_Onlysendingcanpause4Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const sendjob_onlysendingcanpause4 = /** @type {((inputs?: Sendjob_Onlysendingcanpause4Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Sendjob_Onlysendingcanpause4Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return __id.sendjob_onlysendingcanpause4(inputs)
	return __en.sendjob_onlysendingcanpause4(inputs)
});
export { sendjob_onlysendingcanpause4 as "sendJob.onlySendingCanPause" }
/**
* | output |
* | --- |
* | "Only a paused job can be resumed." |
*
* @param {Sendjob_Onlypausedcanresume4Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const sendjob_onlypausedcanresume4 = /** @type {((inputs?: Sendjob_Onlypausedcanresume4Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Sendjob_Onlypausedcanresume4Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return __id.sendjob_onlypausedcanresume4(inputs)
	return __en.sendjob_onlypausedcanresume4(inputs)
});
export { sendjob_onlypausedcanresume4 as "sendJob.onlyPausedCanResume" }
/**
* | output |
* | --- |
* | "This job already finished; it cannot be cancelled." |
*
* @param {Sendjob_Finishedcannotcancel3Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const sendjob_finishedcannotcancel3 = /** @type {((inputs?: Sendjob_Finishedcannotcancel3Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Sendjob_Finishedcannotcancel3Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return __id.sendjob_finishedcannotcancel3(inputs)
	return __en.sendjob_finishedcannotcancel3(inputs)
});
export { sendjob_finishedcannotcancel3 as "sendJob.finishedCannotCancel" }
/**
* | output |
* | --- |
* | "Only a finished job can be retried." |
*
* @param {Sendjob_Onlyfinishedcanretry4Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const sendjob_onlyfinishedcanretry4 = /** @type {((inputs?: Sendjob_Onlyfinishedcanretry4Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Sendjob_Onlyfinishedcanretry4Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return __id.sendjob_onlyfinishedcanretry4(inputs)
	return __en.sendjob_onlyfinishedcanretry4(inputs)
});
export { sendjob_onlyfinishedcanretry4 as "sendJob.onlyFinishedCanRetry" }
/**
* | output |
* | --- |
* | "No failed recipients to retry." |
*
* @param {Sendjob_Nofailedrecipients3Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const sendjob_nofailedrecipients3 = /** @type {((inputs?: Sendjob_Nofailedrecipients3Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Sendjob_Nofailedrecipients3Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return __id.sendjob_nofailedrecipients3(inputs)
	return __en.sendjob_nofailedrecipients3(inputs)
});
export { sendjob_nofailedrecipients3 as "sendJob.noFailedRecipients" }
/**
* | output |
* | --- |
* | "None of the recipients has a confirmed generated attachment. Generate the PDFs first." |
*
* @param {Sendjob_Noconfirmedattachments3Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const sendjob_noconfirmedattachments3 = /** @type {((inputs?: Sendjob_Noconfirmedattachments3Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Sendjob_Noconfirmedattachments3Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return __id.sendjob_noconfirmedattachments3(inputs)
	return __en.sendjob_noconfirmedattachments3(inputs)
});
export { sendjob_noconfirmedattachments3 as "sendJob.noConfirmedAttachments" }
/**
* | output |
* | --- |
* | "The generated attachment files no longer exist on disk. Generate the PDFs again." |
*
* @param {Sendjob_Attachmentsmissingondisk4Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const sendjob_attachmentsmissingondisk4 = /** @type {((inputs?: Sendjob_Attachmentsmissingondisk4Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Sendjob_Attachmentsmissingondisk4Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return __id.sendjob_attachmentsmissingondisk4(inputs)
	return __en.sendjob_attachmentsmissingondisk4(inputs)
});
export { sendjob_attachmentsmissingondisk4 as "sendJob.attachmentsMissingOnDisk" }
/**
* | output |
* | --- |
* | "Recipient no longer exists in the database." |
*
* @param {Sendjob_Recipientdeleted2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const sendjob_recipientdeleted2 = /** @type {((inputs?: Sendjob_Recipientdeleted2Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Sendjob_Recipientdeleted2Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return __id.sendjob_recipientdeleted2(inputs)
	return __en.sendjob_recipientdeleted2(inputs)
});
export { sendjob_recipientdeleted2 as "sendJob.recipientDeleted" }
/**
* | output |
* | --- |
* | "This recipient has no email address." |
*
* @param {Sendjob_Recipientnoemail3Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const sendjob_recipientnoemail3 = /** @type {((inputs?: Sendjob_Recipientnoemail3Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Sendjob_Recipientnoemail3Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return __id.sendjob_recipientnoemail3(inputs)
	return __en.sendjob_recipientnoemail3(inputs)
});
export { sendjob_recipientnoemail3 as "sendJob.recipientNoEmail" }
/**
* | output |
* | --- |
* | "No confirmed generated attachment for this recipient." |
*
* @param {Sendjob_Noattachmentforrecipient4Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const sendjob_noattachmentforrecipient4 = /** @type {((inputs?: Sendjob_Noattachmentforrecipient4Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Sendjob_Noattachmentforrecipient4Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return __id.sendjob_noattachmentforrecipient4(inputs)
	return __en.sendjob_noattachmentforrecipient4(inputs)
});
export { sendjob_noattachmentforrecipient4 as "sendJob.noAttachmentForRecipient" }
/**
* | output |
* | --- |
* | "Retries exhausted: {message}" |
*
* @param {Sendjob_Retriesexhausted2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const sendjob_retriesexhausted2 = /** @type {((inputs: Sendjob_Retriesexhausted2Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Sendjob_Retriesexhausted2Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return __id.sendjob_retriesexhausted2(inputs)
	return __en.sendjob_retriesexhausted2(inputs)
});
export { sendjob_retriesexhausted2 as "sendJob.retriesExhausted" }
/**
* | output |
* | --- |
* | "Could not resume this job." |
*
* @param {Sendjob_Couldnotresumejob4Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const sendjob_couldnotresumejob4 = /** @type {((inputs?: Sendjob_Couldnotresumejob4Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Sendjob_Couldnotresumejob4Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return __id.sendjob_couldnotresumejob4(inputs)
	return __en.sendjob_couldnotresumejob4(inputs)
});
export { sendjob_couldnotresumejob4 as "sendJob.couldNotResumeJob" }
/**
* | output |
* | --- |
* | "The template no longer exists." |
*
* @param {Generatejob_Templatemissing2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const generatejob_templatemissing2 = /** @type {((inputs?: Generatejob_Templatemissing2Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Generatejob_Templatemissing2Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return __id.generatejob_templatemissing2(inputs)
	return __en.generatejob_templatemissing2(inputs)
});
export { generatejob_templatemissing2 as "generateJob.templateMissing" }
/**
* | output |
* | --- |
* | "The template file is missing: \"{path}\". It may have been moved or deleted." |
*
* @param {Generatejob_Templatefilemissing3Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const generatejob_templatefilemissing3 = /** @type {((inputs: Generatejob_Templatefilemissing3Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Generatejob_Templatefilemissing3Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return __id.generatejob_templatefilemissing3(inputs)
	return __en.generatejob_templatefilemissing3(inputs)
});
export { generatejob_templatefilemissing3 as "generateJob.templateFileMissing" }
/**
* | output |
* | --- |
* | "LibreOffice is not installed, so DOCX letters cannot be converted to PDF." |
*
* @param {Generatejob_Libreofficemissing3Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const generatejob_libreofficemissing3 = /** @type {((inputs?: Generatejob_Libreofficemissing3Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Generatejob_Libreofficemissing3Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return __id.generatejob_libreofficemissing3(inputs)
	return __en.generatejob_libreofficemissing3(inputs)
});
export { generatejob_libreofficemissing3 as "generateJob.libreOfficeMissing" }
/**
* | output |
* | --- |
* | "Recipient no longer exists in the database." |
*
* @param {Generatejob_Recipientdeleted2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const generatejob_recipientdeleted2 = /** @type {((inputs?: Generatejob_Recipientdeleted2Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Generatejob_Recipientdeleted2Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return __id.generatejob_recipientdeleted2(inputs)
	return __en.generatejob_recipientdeleted2(inputs)
});
export { generatejob_recipientdeleted2 as "generateJob.recipientDeleted" }
/**
* | output |
* | --- |
* | "Missing data for slot \"{slot}\"." |
*
* @param {Generatejob_Missingslotdata3Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const generatejob_missingslotdata3 = /** @type {((inputs: Generatejob_Missingslotdata3Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Generatejob_Missingslotdata3Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return __id.generatejob_missingslotdata3(inputs)
	return __en.generatejob_missingslotdata3(inputs)
});
export { generatejob_missingslotdata3 as "generateJob.missingSlotData" }
/**
* | output |
* | --- |
* | "Could not fill the letter: {message}" |
*
* @param {Generatejob_Couldnotfill3Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const generatejob_couldnotfill3 = /** @type {((inputs: Generatejob_Couldnotfill3Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Generatejob_Couldnotfill3Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return __id.generatejob_couldnotfill3(inputs)
	return __en.generatejob_couldnotfill3(inputs)
});
export { generatejob_couldnotfill3 as "generateJob.couldNotFill" }
/**
* | output |
* | --- |
* | "LibreOffice produced no PDF for this letter." |
*
* @param {Generatejob_Nopdfproduced3Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const generatejob_nopdfproduced3 = /** @type {((inputs?: Generatejob_Nopdfproduced3Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Generatejob_Nopdfproduced3Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return __id.generatejob_nopdfproduced3(inputs)
	return __en.generatejob_nopdfproduced3(inputs)
});
export { generatejob_nopdfproduced3 as "generateJob.noPdfProduced" }
/**
* | output |
* | --- |
* | "Select at least one recipient." |
*
* @param {Generatejob_Selectrecipients2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const generatejob_selectrecipients2 = /** @type {((inputs?: Generatejob_Selectrecipients2Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Generatejob_Selectrecipients2Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return __id.generatejob_selectrecipients2(inputs)
	return __en.generatejob_selectrecipients2(inputs)
});
export { generatejob_selectrecipients2 as "generateJob.selectRecipients" }
/**
* | output |
* | --- |
* | "None of the selected recipients still exist." |
*
* @param {Generatejob_Norecipientsexist3Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const generatejob_norecipientsexist3 = /** @type {((inputs?: Generatejob_Norecipientsexist3Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Generatejob_Norecipientsexist3Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return __id.generatejob_norecipientsexist3(inputs)
	return __en.generatejob_norecipientsexist3(inputs)
});
export { generatejob_norecipientsexist3 as "generateJob.noRecipientsExist" }
/**
* | output |
* | --- |
* | "The job could not be created." |
*
* @param {Generatejob_Jobcouldnotbecreated5Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const generatejob_jobcouldnotbecreated5 = /** @type {((inputs?: Generatejob_Jobcouldnotbecreated5Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Generatejob_Jobcouldnotbecreated5Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return __id.generatejob_jobcouldnotbecreated5(inputs)
	return __en.generatejob_jobcouldnotbecreated5(inputs)
});
export { generatejob_jobcouldnotbecreated5 as "generateJob.jobCouldNotBeCreated" }
/**
* | output |
* | --- |
* | "Could not find a free file name for \"{name}\"." |
*
* @param {Generatejob_Nofreefilename4Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const generatejob_nofreefilename4 = /** @type {((inputs: Generatejob_Nofreefilename4Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Generatejob_Nofreefilename4Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return __id.generatejob_nofreefilename4(inputs)
	return __en.generatejob_nofreefilename4(inputs)
});
export { generatejob_nofreefilename4 as "generateJob.noFreeFileName" }
/**
* | output |
* | --- |
* | "Slot scanning works on .docx files only." |
*
* @param {Templatesservice_Docxonly2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const templatesservice_docxonly2 = /** @type {((inputs?: Templatesservice_Docxonly2Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Templatesservice_Docxonly2Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return __id.templatesservice_docxonly2(inputs)
	return __en.templatesservice_docxonly2(inputs)
});
export { templatesservice_docxonly2 as "templatesService.docxOnly" }
/**
* | output |
* | --- |
* | "Could not read \"{path}\": {detail}" |
*
* @param {Templatesservice_Couldnotread3Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const templatesservice_couldnotread3 = /** @type {((inputs: Templatesservice_Couldnotread3Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Templatesservice_Couldnotread3Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return __id.templatesservice_couldnotread3(inputs)
	return __en.templatesservice_couldnotread3(inputs)
});
export { templatesservice_couldnotread3 as "templatesService.couldNotRead" }
/**
* | output |
* | --- |
* | "No recognizable name column was found. Select it in the mapping below." |
*
* @param {Importservice_Nonamecolumn3Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const importservice_nonamecolumn3 = /** @type {((inputs?: Importservice_Nonamecolumn3Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Importservice_Nonamecolumn3Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return __id.importservice_nonamecolumn3(inputs)
	return __en.importservice_nonamecolumn3(inputs)
});
export { importservice_nonamecolumn3 as "importService.noNameColumn" }
/**
* | output |
* | --- |
* | "No recognizable email column was found. Select it in the mapping below." |
*
* @param {Importservice_Noemailcolumn3Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const importservice_noemailcolumn3 = /** @type {((inputs?: Importservice_Noemailcolumn3Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Importservice_Noemailcolumn3Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return __id.importservice_noemailcolumn3(inputs)
	return __en.importservice_noemailcolumn3(inputs)
});
export { importservice_noemailcolumn3 as "importService.noEmailColumn" }
/**
* | output |
* | --- |
* | "Not an Excel file (.xlsx or .xls expected)" |
*
* @param {Importservice_Notexcel2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const importservice_notexcel2 = /** @type {((inputs?: Importservice_Notexcel2Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Importservice_Notexcel2Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return __id.importservice_notexcel2(inputs)
	return __en.importservice_notexcel2(inputs)
});
export { importservice_notexcel2 as "importService.notExcel" }
/**
* | output |
* | --- |
* | "Column headers {headers} appear more than once after trimming - only the first occurrence is imported." |
*
* @param {Importservice_Duplicateheaders2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const importservice_duplicateheaders2 = /** @type {((inputs: Importservice_Duplicateheaders2Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Importservice_Duplicateheaders2Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return __id.importservice_duplicateheaders2(inputs)
	return __en.importservice_duplicateheaders2(inputs)
});
export { importservice_duplicateheaders2 as "importService.duplicateHeaders" }
/**
* | output |
* | --- |
* | "{count} row(s) skipped because the name is empty." |
*
* @param {Importservice_Rowsskippedemptyname4Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const importservice_rowsskippedemptyname4 = /** @type {((inputs: Importservice_Rowsskippedemptyname4Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Importservice_Rowsskippedemptyname4Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return __id.importservice_rowsskippedemptyname4(inputs)
	return __en.importservice_rowsskippedemptyname4(inputs)
});
export { importservice_rowsskippedemptyname4 as "importService.rowsSkippedEmptyName" }
/**
* | output |
* | --- |
* | "Profile name is required." |
*
* @param {Validation_Smtpnamerequired2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const validation_smtpnamerequired2 = /** @type {((inputs?: Validation_Smtpnamerequired2Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Validation_Smtpnamerequired2Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return __id.validation_smtpnamerequired2(inputs)
	return __en.validation_smtpnamerequired2(inputs)
});
export { validation_smtpnamerequired2 as "validation.smtpNameRequired" }
/**
* | output |
* | --- |
* | "SMTP host is required." |
*
* @param {Validation_Smtphostrequired2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const validation_smtphostrequired2 = /** @type {((inputs?: Validation_Smtphostrequired2Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Validation_Smtphostrequired2Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return __id.validation_smtphostrequired2(inputs)
	return __en.validation_smtphostrequired2(inputs)
});
export { validation_smtphostrequired2 as "validation.smtpHostRequired" }
/**
* | output |
* | --- |
* | "Port must be a whole number between 1 and 65535." |
*
* @param {Validation_Smtpportinvalid2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const validation_smtpportinvalid2 = /** @type {((inputs?: Validation_Smtpportinvalid2Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Validation_Smtpportinvalid2Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return __id.validation_smtpportinvalid2(inputs)
	return __en.validation_smtpportinvalid2(inputs)
});
export { validation_smtpportinvalid2 as "validation.smtpPortInvalid" }
/**
* | output |
* | --- |
* | "Username is required." |
*
* @param {Validation_Smtpusernamerequired2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const validation_smtpusernamerequired2 = /** @type {((inputs?: Validation_Smtpusernamerequired2Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Validation_Smtpusernamerequired2Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return __id.validation_smtpusernamerequired2(inputs)
	return __en.validation_smtpusernamerequired2(inputs)
});
export { validation_smtpusernamerequired2 as "validation.smtpUsernameRequired" }
/**
* | output |
* | --- |
* | "App password is required." |
*
* @param {Validation_Smtppasswordrequired2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const validation_smtppasswordrequired2 = /** @type {((inputs?: Validation_Smtppasswordrequired2Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Validation_Smtppasswordrequired2Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return __id.validation_smtppasswordrequired2(inputs)
	return __en.validation_smtppasswordrequired2(inputs)
});
export { validation_smtppasswordrequired2 as "validation.smtpPasswordRequired" }
/**
* | output |
* | --- |
* | "Template name is required." |
*
* @param {Validation_Templatenamerequired2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const validation_templatenamerequired2 = /** @type {((inputs?: Validation_Templatenamerequired2Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Validation_Templatenamerequired2Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return __id.validation_templatenamerequired2(inputs)
	return __en.validation_templatenamerequired2(inputs)
});
export { validation_templatenamerequired2 as "validation.templateNameRequired" }
/**
* | output |
* | --- |
* | "A template needs at least one slot." |
*
* @param {Validation_Templateneedsslot2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const validation_templateneedsslot2 = /** @type {((inputs?: Validation_Templateneedsslot2Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Validation_Templateneedsslot2Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return __id.validation_templateneedsslot2(inputs)
	return __en.validation_templateneedsslot2(inputs)
});
export { validation_templateneedsslot2 as "validation.templateNeedsSlot" }
/**
* | output |
* | --- |
* | "The output pattern must reference at least one slot, e.g. \"LOA_{name}.pdf\"." |
*
* @param {Validation_Templatepatternneedsslot3Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const validation_templatepatternneedsslot3 = /** @type {((inputs: Validation_Templatepatternneedsslot3Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Validation_Templatepatternneedsslot3Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return __id.validation_templatepatternneedsslot3(inputs)
	return __en.validation_templatepatternneedsslot3(inputs)
});
export { validation_templatepatternneedsslot3 as "validation.templatePatternNeedsSlot" }
/**
* | output |
* | --- |
* | "The output pattern references \"{slot}\", which is not one of the template's slots." |
*
* @param {Validation_Templatepatternunknownslot3Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const validation_templatepatternunknownslot3 = /** @type {((inputs: Validation_Templatepatternunknownslot3Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Validation_Templatepatternunknownslot3Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return __id.validation_templatepatternunknownslot3(inputs)
	return __en.validation_templatepatternunknownslot3(inputs)
});
export { validation_templatepatternunknownslot3 as "validation.templatePatternUnknownSlot" }
/**
* | output |
* | --- |
* | "Excel" |
*
* @param {Dialogs_Excelfilter1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const dialogs_excelfilter1 = /** @type {((inputs?: Dialogs_Excelfilter1Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Dialogs_Excelfilter1Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return __id.dialogs_excelfilter1(inputs)
	return __en.dialogs_excelfilter1(inputs)
});
export { dialogs_excelfilter1 as "dialogs.excelFilter" }
/**
* | output |
* | --- |
* | "Template" |
*
* @param {Dialogs_Templatefilter1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const dialogs_templatefilter1 = /** @type {((inputs?: Dialogs_Templatefilter1Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Dialogs_Templatefilter1Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return __id.dialogs_templatefilter1(inputs)
	return __en.dialogs_templatefilter1(inputs)
});
export { dialogs_templatefilter1 as "dialogs.templateFilter" }